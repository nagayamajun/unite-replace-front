import { AuthWithEmailAndPassword } from "../../features/auth/types/auth"
import { useLoading } from "@/hooks/useLoading";
import { UserAuthFactory } from "../../features/auth/models/user_auth_model";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { setAuthToken } from "@/libs/axios";
import { FAIL_TO_SIGN_UP, SUCCESS_IN_SIGN_UP } from "@/constants/constants";
import { useNotice } from "@/adapters/notice.adapter";

export const useUserSignUp = () => {
  const { showLoading, hideLoading } = useLoading();
  const notice = useNotice();

  const userSignUp = async(params: AuthWithEmailAndPassword) => {
    try {
      showLoading();
      const customToken = await UserAuthFactory().signUp(params);
      const userCredential = await signInWithCustomToken(auth, customToken.token);
      const idToken = await userCredential.user.getIdToken();
      setAuthToken(idToken);
      hideLoading();
      notice.success(SUCCESS_IN_SIGN_UP)
    } catch (error: unknown) {
      hideLoading();
      const isTypeSafeError = error instanceof Error;
      notice.error(`${FAIL_TO_SIGN_UP}\n${isTypeSafeError ? error.message : ""}`)
      return false
    }

    return true
  };

  return {
    userSignUp
  }
}