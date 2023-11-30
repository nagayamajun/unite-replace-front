import { AuthWithEmailAndPassword } from "../../features/auth/types/auth"
import { FAIL_TO_SIGN_UP, SUCCESS_IN_SIGN_UP } from "@/constants/constants";
import { useNotice } from "@/adapters/notice.adapter";
import { useUser } from "@/adapters/user.adapter";
import { useFirebase } from "@/adapters/firebase.adapter";
import { useAxios } from "@/adapters/axios.adapter";
import { useGlobalLoading } from "@/adapters/globalState.adapter";

export const useUserSignUp = () => {
  const loadingService = useGlobalLoading();
  const noticeService = useNotice();
  const userService = useUser();
  const firebaseService = useFirebase();
  const axiosService = useAxios();

  const userSignUp = async(params: AuthWithEmailAndPassword) => {
    try {
      loadingService.showLoading();

      const customToken = await userService.signUpWithEmailAndPassword(params.email, params.password);
      const userCredential = await firebaseService.signInWithCustomToken(customToken.token);
      const idToken = await firebaseService.getIdToken(userCredential);
      axiosService.setAuthToken(idToken);

      loadingService.hideLoading();
      noticeService.success(SUCCESS_IN_SIGN_UP);
      return true
    } catch (error: unknown) {
      loadingService.hideLoading();
      const isTypeSafeError = error instanceof Error;
      noticeService.error(`${FAIL_TO_SIGN_UP}\n${isTypeSafeError ? error.message : ""}`)
      return false
    }
  };

  return {
    userSignUp
  }
}