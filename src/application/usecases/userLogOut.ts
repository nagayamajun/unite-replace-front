import { useFirebase } from "@/adapters/firebase.adapter";
import { useNotice } from "@/adapters/notice.adapter";
import { FAIL_TO_SIGN_OUT, SUCCESS_IN_SIGN_OUT } from "@/constants/constants";
import { useLoading } from "@/hooks/useLoading";

export const useUserLogOut = () => {
  const loading = useLoading();
  const notice = useNotice();
  const firebaseService = useFirebase();

  const userLogOut = async() => {
    try {
      loading.showLoading();
      await firebaseService.logOut();
      localStorage.clear();
      loading.hideLoading();
      notice.success(SUCCESS_IN_SIGN_OUT);

      return true;
    } catch (error: unknown) {
      loading.hideLoading();
      const isTypeSafeError = error instanceof Error;
      notice.error(`${FAIL_TO_SIGN_OUT}\n${isTypeSafeError && error.message}`);

      return false
    }
  };

  return {
    userLogOut
  }
}