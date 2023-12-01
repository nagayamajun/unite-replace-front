import { FAIL_TO_SIGN_IN, SUCCESS_IN_SIGN_IN } from "@/constants/constants";
import { AuthWithEmailAndPassword } from "@/features/auth/types/auth";
import { useNotice } from "@/adapters/notice.adapter";
import { useFirebase } from "@/adapters/firebase.adapter";
import { useUser } from "@/adapters/user.adapter";
import { useAxios } from "@/adapters/axios.adapter";
import { useGlobalLoading } from "@/adapters/globalState.adapter";


export const useUserSignIn = () => {
  const loadingService = useGlobalLoading();
  const noticeService = useNotice();
  const firebaseService = useFirebase();
  const userService = useUser();
  const axiosService = useAxios();

  const userSignIn = async(params: AuthWithEmailAndPassword) => {
    try {
      loadingService.showLoading();

      const userCredential = await firebaseService.signInWithEmailAndPassword(params.email, params.password);
      const token = await firebaseService.getIdToken(userCredential);
      axiosService.setAuthToken(token);
      const user = await userService.findByFirebaseUid();

      loadingService.hideLoading();
      noticeService.success(SUCCESS_IN_SIGN_IN)

      return user
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      loadingService.hideLoading();
      noticeService.error(`${FAIL_TO_SIGN_IN}\n${isTypeSafeError ? error.message : ""}`);
      return undefined
    }
  };

  return {
    userSignIn
  }
}