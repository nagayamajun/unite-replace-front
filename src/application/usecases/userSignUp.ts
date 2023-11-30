import { AuthWithEmailAndPassword } from "../../features/auth/types/auth"
import { useLoading } from "@/hooks/useLoading";
import { FAIL_TO_SIGN_UP, SUCCESS_IN_SIGN_UP } from "@/constants/constants";
import { useNotice } from "@/adapters/notice.adapter";
import { useUser } from "@/adapters/user.adapter";
import { useFirebase } from "@/adapters/firebase.adapter";
import { useAxios } from "@/adapters/axios.adapter";

export const useUserSignUp = () => {
  const loading = useLoading();
  const notice = useNotice();
  const userService = useUser();
  const firebaseService = useFirebase();
  const axiosService = useAxios();

  const userSignUp = async(params: AuthWithEmailAndPassword) => {
    try {
      loading.showLoading();

      const customToken = await userService.signUpWithEmailAndPassword(params.email, params.password);
      const userCredential = await firebaseService.signInWithCustomToken(customToken.token);
      const idToken = await firebaseService.getIdToken(userCredential);
      axiosService.setAuthToken(idToken);

      loading.hideLoading();
      notice.success(SUCCESS_IN_SIGN_UP);
      return true
    } catch (error: unknown) {
      loading.hideLoading();
      const isTypeSafeError = error instanceof Error;
      notice.error(`${FAIL_TO_SIGN_UP}\n${isTypeSafeError ? error.message : ""}`)
      return false
    }
  };

  return {
    userSignUp
  }
}