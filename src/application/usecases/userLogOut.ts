import { useFirebase } from "@/adapters/firebase.adapter";
import { useGlobalLoading } from "@/adapters/globalState.adapter";
import { useNotice } from "@/adapters/notice.adapter";
import { FAIL_TO_SIGN_OUT, SUCCESS_IN_SIGN_OUT } from "@/constants/constants";

export const useUserLogOut = () => {
  const loadingService = useGlobalLoading();
  const noticeService = useNotice();
  const firebaseService = useFirebase();

  const userLogOut = async() => {
    try {
      loadingService.showLoading();
      await firebaseService.logOut();
      localStorage.clear();
      loadingService.hideLoading();
      noticeService.success(SUCCESS_IN_SIGN_OUT);

      return true;
    } catch (error: unknown) {
      loadingService.hideLoading();
      const isTypeSafeError = error instanceof Error;
      noticeService.error(`${FAIL_TO_SIGN_OUT}\n${isTypeSafeError && error.message}`);

      return false
    }
  };

  return {
    userLogOut
  }
}