import { useGlobalLoading, useGlobalUser } from "@/adapters/globalState.adapter";
import { useNotice } from "@/adapters/notice.adapter";
import { useUser } from "@/adapters/user.adapter";
import { FAIL_TO_UPDATE_USER, SUCCESS_IN_UPDATE_USER } from "@/constants/constants";

export const useUpdateUserInfo = () => {
  const noticeService = useNotice();
  const loadingService = useGlobalLoading();
  const userService = useUser();
  const { user } = useGlobalUser();

  const updateUserInfo = async (submitData: any) => {
    try {
      loadingService.showLoading();
      await userService.update({...user, ...submitData});
      noticeService.success(SUCCESS_IN_UPDATE_USER);
      loadingService.hideLoading();

      return true;
    } catch (error: unknown) {
      loadingService.hideLoading();
      const isTypeSafeError = error instanceof Error;
      noticeService.error(`${FAIL_TO_UPDATE_USER}\n${isTypeSafeError && error.message}`);

      return false;
    };
  };

  return {
    updateUserInfo
  };
};