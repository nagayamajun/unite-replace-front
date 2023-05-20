import { axiosInstance, setAuthToken } from "@/libs/axios";
import { auth } from "@/libs/firebase";
import axios from "axios";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, signInWithCustomToken, signInWithEmailAndPassword, signInWithPopup, signOut, UserCredential } from "firebase/auth";

export const authRepository = {
  //メールでの認証
  async signUpWithEmail(email: string, password: string): Promise<any> {
    //customTokenはサーバーサイドで発行されたトークンを返す。
    const customToken = (
      await axiosInstance.post("/user", { email, password }).catch((err) => {
        throw new Error(err);
      })
    ).data.token;
    console.log(customToken)
    //userCredentialはサーバーサイドのtokenを利用してfirebaseにログイン
    const userCredential = await signInWithCustomToken(auth, customToken).catch((err) => {
      throw new Error(err)
    });
    //firebaseのIDtokenを取得
    const idToken = await  userCredential.user.getIdToken();
    setAuthToken(idToken)
    return {success: true, message: "一旦成功"}
  },

  async signInWithGoogle(): Promise<{success: boolean, message: string}> {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider)
      console.log("成功しました")
      return { success: true, message: "ログインに成功しました。"}
    } catch (error) {
      return {success: false, message: "ログインに成功しました。"}
    }
  },

  //その内使えるようにする予定
  async signWithGithub() {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      alert("GitHub認証に失敗しました")
      window.location.reload();
    }
  },

  //メールでのユーザー登録
  async signInWithEmail(
    email: string,
    password: string
  ): Promise<{success: boolean, message: string} | undefined> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, message: "ログインに成功しました。"}
    } catch (error) {
      return {success: false, message: "失敗しました。再度お試しください。"}
    }
  },

  //サインアウトする
  async logOut(): Promise<void> {
    try {
      await signOut(auth);
      console.log("成功")
    } catch (error) {
      alert('サインアウトに失敗しました。');
      window.location.reload();
    }
  },

};



