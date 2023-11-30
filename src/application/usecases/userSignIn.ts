import { FAIL_TO_SIGN_IN, SUCCESS_IN_SIGN_IN } from "@/constants/constants";
import { AuthWithEmailAndPassword } from "@/features/auth/types/auth";
import { useLoading } from "@/hooks/useLoading"
import { useNotice } from "@/adapters/notice.adapter";
import { useFirebase } from "@/adapters/firebase.adapter";
import { useUser } from "@/adapters/user.adapter";
import { useAxios } from "@/adapters/axios.adapter";


export const useUserSignIn = () => {
  const loading = useLoading();
  const notice = useNotice();
  const firebaseService = useFirebase();
  const userService = useUser();
  const axiosService = useAxios();

  const userSignIn = async(params: AuthWithEmailAndPassword) => {
    try {
      loading.showLoading();

      const userCredential = await firebaseService.signInWithEmailAndPassword(params.email, params.password);
      const token = await firebaseService.getIdToken(userCredential);
      axiosService.setAuthToken(token);
      const user = await userService.findByFirebaseUid();

      loading.hideLoading();
      notice.success(SUCCESS_IN_SIGN_IN)

      return user
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      loading.hideLoading();
      notice.error(`${FAIL_TO_SIGN_IN}\n${isTypeSafeError ? error.message : ""}`);
      return undefined
    }
  };

  return {
    userSignIn
  }
}