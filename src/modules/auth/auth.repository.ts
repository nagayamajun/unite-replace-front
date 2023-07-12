import {
  FAIL_TO_SIGN_IN,
  FAIL_TO_SIGN_OUT,
  FAIL_TO_SIGN_UP,
  MAIL_USED_IN_PROVIDER_EXISTS,
  PASSWORS_DONOT_MATCH,
  SUCCESS_IN_SIGN_IN,
  SUCCESS_IN_SIGN_OUT,
  SUCCESS_IN_SIGN_UP,
} from "@/constants/constants";
import { axiosInstance, setAuthToken } from "@/libs/axios";
import { auth, corporateAuth } from "@/libs/firebase";
import { ConfirmModal } from "@/types/confirmModal";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { employeeRepository } from "../employee/employee.repository";


export const authRepository = {
  //学生ユーザーのメール・パスワードでのログイン
  async signInWithEmail(
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string } | undefined> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, message: SUCCESS_IN_SIGN_IN };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      return {
        success: false,
        message: `${FAIL_TO_SIGN_IN}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },

  //学生ユーザーのメール・パスワードでのサインアップ
  async signUpWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
    try {
      const customToken = (
        await axiosInstance
          .post("/user", { email, password })
          .catch((error) => {
            throw error.response.data;
          })
      ).data.token;

      // サーバーサイドから発行されたCustom Tokenを使ってFirebaseにサインイン
      const userCredential = await signInWithCustomToken(auth, customToken);

      // 上記でサインインした後、Firebase IDトークンを取得
      // ここにおけるidTokenとcustomTokenは別物
      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);

      return { success: true, message: SUCCESS_IN_SIGN_UP };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      return {
        success: false,
        message: `${FAIL_TO_SIGN_UP}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },

  //従業員のメール・パスワード・共有パスワードでのログイン
  async employeeSignInWithEmail(email: string, password: string, sharedPassword: string): Promise<ConfirmModal  | any> {
    try {
      const userCredential = await signInWithEmailAndPassword(corporateAuth, email, password);
      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);

      //従業員がsharedPasswordを持った企業に所属している確認する
      const employee = await employeeRepository.getEmployeeByFirebaseUID();
      
      if (employee.belongToCorporation.sharedPassword !== sharedPassword) return {
        sucess: false, message: PASSWORS_DONOT_MATCH
      }

      return { success: true, message: SUCCESS_IN_SIGN_IN };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        success: false,
        message: `FAIL_TO_SIGN_IN\n${
          isTypeSafeError ? error.message : ""
        }`,
      };
    }
  },

  //企業側従業員メールパスワード企業共有パスワードを用いてサインアップ。
  async employeeSignUpWithEmail(
    email: string,
    password: string,
    sharedPassword: string
  ): Promise<any> {
    try {
      //customTokenはサーバーサイドで発行されたトークンを返す。
      const customToken = (
        await axiosInstance.post("/employee", {
          email,
          password,
          sharedPassword,
        })
      ).data.token;
      //userCredentialはサーバーサイドのtokenを利用してfirebaseにログイン
      const userCredential = await signInWithCustomToken(
        corporateAuth,
        customToken
      ).catch((err) => {
        throw new Error(err);
      });
      //firebaseのIDtokenを取得
      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);

      return { success: true, message: SUCCESS_IN_SIGN_UP };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      return {
        success: false,
        message: `${FAIL_TO_SIGN_UP}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },

  //学生ユーザーGoogle認証
  async signInWithGoogle(): Promise<{ success: boolean; message: string }> {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider).catch(() => {
        throw new Error(MAIL_USED_IN_PROVIDER_EXISTS);
      });
      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);
      await axiosInstance
        .post("/user/create-with-google-or-github")
        .catch((error) => {
          throw error.response.data;
        });

      return { success: true, message: SUCCESS_IN_SIGN_IN };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      return {
        success: false,
        message: `${FAIL_TO_SIGN_IN}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },

  //学生ユーザーGitHub認証
  async signInWithGithub() {
    const provider = new GithubAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider).catch(() => {
        throw new Error(MAIL_USED_IN_PROVIDER_EXISTS);
      });
      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);
      await axiosInstance
        .post("/user/create-with-google-or-github")
        .catch((error) => {
          throw error.response.data;
        });

      return { success: true, message: SUCCESS_IN_SIGN_IN };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      return {
        success: false,
        message: `${FAIL_TO_SIGN_IN}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },

  //サインアウトする
  async logOut() {
    try {
      await signOut(auth);

      return { success: true, message: SUCCESS_IN_SIGN_OUT };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      return {
        success: false,
        message: `${FAIL_TO_SIGN_OUT}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },
};
