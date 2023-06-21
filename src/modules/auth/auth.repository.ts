import { axiosInstance, setAuthToken } from "@/libs/axios";
import { auth } from "@/libs/firebase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const authRepository = {
  //メールでのユーザー登録
  async signInWithEmail(
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string } | undefined> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, message: "ログインに成功しました。" };
    } catch (error) {
      return { success: false, message: "失敗しました。再度お試しください。" };
    }
  },
  //学生側メールとパスワードで認証する
  async signUpWithEmail(email: string, password: string): Promise<any> {
    //customTokenはサーバーサイドで発行されたトークンを返す。
    const customToken = (
      await axiosInstance.post("/user", { email, password }).catch((err) => {
        throw new Error(err);
      })
    ).data.token;
    //userCredentialはサーバーサイドのtokenを利用してfirebaseにログイン
    const userCredential = await signInWithCustomToken(auth, customToken).catch(
      (err) => {
        throw new Error(err);
      }
    );
    //firebaseのIDtokenを取得
    const idToken = await userCredential.user.getIdToken();
    setAuthToken(idToken);
    return { success: true, message: "一旦成功" };
  },
  //企業側メールパスワード企業共有パスワードを用いて認証する。
  async employeeSignUpWithEmail(
    email: string,
    password: string,
    sharedPassword: string
  ): Promise<any> {
    //customTokenはサーバーサイドで発行されたトークンを返す。
    const customToken = (
      await axiosInstance
        .post("/employee", { email, password, sharedPassword })
        .catch((err) => {
          throw new Error(err);
        })
    ).data.token;
    //userCredentialはサーバーサイドのtokenを利用してfirebaseにログイン
    const userCredential = await signInWithCustomToken(auth, customToken).catch(
      (err) => {
        throw new Error(err);
      }
    );
    //firebaseのIDtokenを取得
    const idToken = await userCredential.user.getIdToken();
    setAuthToken(idToken);
    return { success: true, message: "一旦成功" };
  },

  async signInWithGoogle(): Promise<{ success: boolean; message: string }> {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      return { success: true, message: "ログインに成功しました。" };
    } catch (error) {
      return { success: false, message: "ログインに成功しました。" };
    }
  },

  //その内使えるようにする予定
  async signWithGithub() {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert("GitHub認証に失敗しました");
      window.location.reload();
    }
  },

  //サインアウトする
  async logOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      alert("サインアウトに失敗しました。");
      window.location.reload();
    }
  },

  //以下、バックエンドと接続ver
  async signUpWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    try {
      const customToken = (
        await axiosInstance.post("/user", { email, password }).catch((err) => {
          throw new Error(err);
        })
      ).data.token;
  
      // サーバーサイドから発行されたCustom Tokenを使ってFirebaseにサインイン
      const userCredential = await signInWithCustomToken(auth, customToken).catch(
        (err) => {
          throw new Error(err);
        }
      );

      // 上記でサインインした後、Firebase IDトークンを取得
      // ここにおけるidTokenとcustomTokenは別物
      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);

      return { success: true, message: "新規登録に成功しました。" };

    } catch (error) {
      return { success: false, message: "新規登録に失敗しました。" };
    }


    return {}
  },
};
