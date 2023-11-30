import { FAIL_TO_SIGN_IN, MAIL_USED_IN_PROVIDER_EXISTS, SUCCESS_IN_SIGN_IN } from "@/constants/constants";
import { useToast } from "@/hooks/useToast";
import { setAuthToken } from "@/libs/axios";
import { auth } from "@/libs/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserAuthFactory } from "../models/user_auth_model";
import { useGlobalLoading } from "@/adapters/globalState.adapter";


export const useGoogleAuth = () => {
  const { showLoading, hideLoading } = useGlobalLoading();
  const { showToast, hideToast } = useToast();

  const signInWithGoogle = async() => {
    const provider = new GoogleAuthProvider();
    showLoading();
    try {
      const userCredential = await signInWithPopup(auth, provider).catch(() => {
        throw new Error(MAIL_USED_IN_PROVIDER_EXISTS);
      });

      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);

      const createdUser = await UserAuthFactory().signInWithGoogle();
      hideLoading();
      
      showToast({
        style: 'success',
        message: SUCCESS_IN_SIGN_IN,
      });
      return createdUser;
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
    signInWithGoogle
  }
}