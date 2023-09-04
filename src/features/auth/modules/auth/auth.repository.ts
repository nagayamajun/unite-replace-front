import {
  FAIL_TO_SIGN_IN,
  FAIL_TO_SIGN_OUT,
  FAIL_TO_SIGN_UP,
  MAIL_USED_IN_PROVIDER_EXISTS,
  PASSWORD_DO_NOT_MATCH,
  SUCCESS_IN_SIGN_IN,
  SUCCESS_IN_SIGN_OUT,
  SUCCESS_IN_SIGN_UP,
} from "@/constants/constants";
import { axiosInstance, setAuthToken } from "@/libs/axios";
import { auth, corporateAuth } from "@/libs/firebase"; 
import { GithubUtils } from "@/libs/github";
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

import { UserRepository } from "../../../user/modules/user/user.repository";
import { User } from "@/features/user/types/user";
import { ToastResult } from "@/types/toast";

export const authRepository = {
  //学生ユーザーのメール・パスワードでのログイン
  async signInWithEmail(
    { email, password }: { email: string, password: string }
  ): Promise<ToastResult> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await userCredential.user.getIdToken();
      setAuthToken(token);

      //このメソッドの呼び出し先で現在のuserレコードにnameが登録されているかどうかを確認するために取得
      const user = await UserRepository.findUserByFirebaseUID();

      return { style: 'success', message: SUCCESS_IN_SIGN_IN, data: user as User };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      return {
        style: 'failed',
        message: `${FAIL_TO_SIGN_IN}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },

  //学生ユーザーのメール・パスワードでのサインアップ
  async signUpWithEmailAndPassword(
    { email, password }: {email: string, password: string}
  ): Promise<ToastResult> {
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

      return { style: 'success', message: SUCCESS_IN_SIGN_UP };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      return {
        style: 'failed',
        message: `${FAIL_TO_SIGN_UP}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },

  //従業員のメール・パスワード・共有パスワードでのログイン
  async employeeSignInWithEmail(email: string, password: string, sharedPassword: string): Promise<ToastResult> {
    try {
      const userCredential = await signInWithEmailAndPassword(corporateAuth, email, password);
      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);

      //従業員がsharedPasswordを持った企業に所属している確認する
      const employee = await employeeRepository.getEmployeeByFirebaseUID();
      
      if (employee.belongToCorporation.sharedPassword !== sharedPassword) return {
        style: 'failed', message: PASSWORD_DO_NOT_MATCH
      }

      return { style: 'success', message: SUCCESS_IN_SIGN_IN };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: 'failed',
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
  ): Promise<ToastResult> {
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

      return { style: 'success', message: SUCCESS_IN_SIGN_UP };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: 'failed',
        message: `${FAIL_TO_SIGN_UP}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },

  //学生ユーザーGoogle認証
  async signInWithGoogle(): Promise<ToastResult> {
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider).catch(() => {
        throw new Error(MAIL_USED_IN_PROVIDER_EXISTS);
      });

      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);

      const createdUser = (
        await axiosInstance
          .post("/user/sign-in-with-google-or-github")
          .catch((error) => {
            throw error.response.data;
          })
      ).data;

      return {
        style: 'success',
        message: SUCCESS_IN_SIGN_IN,
        data: !!createdUser,
      };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      return {
        style: 'failed',
        message: `${FAIL_TO_SIGN_IN}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },

  //学生ユーザーGitHub認証
  async signInWithGithub(): Promise<ToastResult> {
    const provider = new GithubAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider).catch(() => {
        throw new Error(MAIL_USED_IN_PROVIDER_EXISTS);
      });

      const signedCredential =
        GithubAuthProvider.credentialFromResult(userCredential);
      //github apiに接続するためのアクセストークンを取得
      const githubAccessToken = signedCredential?.accessToken;

      //github apiからユーザーのアカウント情報取得
      const githubInfo = await GithubUtils.getAuthenticatedUser(
        githubAccessToken
      );

      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);

      const createdUser = (
        await axiosInstance
          .post("/user/sign-in-with-google-or-github", {
            githubAccount: githubInfo.html_url,
          })
          .catch((error) => {
            throw error.response.data;
          })
      ).data;

      return {
        style: 'success',
        message: SUCCESS_IN_SIGN_IN,
        data: !!createdUser,
      };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;

      return {
        style: 'failed',
        message: `${FAIL_TO_SIGN_IN}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },

  //サインアウトする
  async logOut(): Promise<ToastResult> {
    try {
      await signOut(auth);
      return {
        style: 'success',
        message: SUCCESS_IN_SIGN_OUT 
      };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: 'failed',
        message: `${FAIL_TO_SIGN_OUT}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  },
};
