import { FAIL_TO_SIGN_IN, MAIL_USED_IN_PROVIDER_EXISTS, SUCCESS_IN_SIGN_IN } from "@/constants/constants";
import { useLoading } from "@/hooks/useLoading";
import { useToast } from "@/hooks/useToast";
import { setAuthToken } from "@/libs/axios";
import { auth } from "@/libs/firebase";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { UserAuthFactory } from "../models/user_auth_model";
import { GithubUtils } from "@/libs/github";


export const useGithubAuth = () => {
  const { showLoading, hideLoading } = useLoading();
  const { showToast, hideToast } = useToast();

  const signInWithGithub = async() => {
    const provider = new GithubAuthProvider();

    showLoading();
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

      const createdUser = await UserAuthFactory().signInWithGithub(githubInfo.html_url);
      
      hideLoading();
      showToast({
        style: 'success',
        message: SUCCESS_IN_SIGN_IN,
      })
      return createdUser
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      hideLoading();
      showToast({
        style: 'failed',
        message: `${FAIL_TO_SIGN_IN}\n${isTypeSafeError ? error.message : ""}`,
      })
      return undefined
    }

  };

  return {
    signInWithGithub
  }
}