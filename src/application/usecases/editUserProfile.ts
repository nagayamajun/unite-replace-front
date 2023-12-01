import { useGlobalLoading } from "@/adapters/globalState.adapter";
import { useNotice } from "@/adapters/notice.adapter"
import { useUser } from "@/adapters/user.adapter";
import { FAIL_TO_UPDATE_USER, SUCCESS_IN_UPDATE_USER } from "@/constants/constants";
import { User } from "@/domein/user";

export const useEditUserProfile = () => {
  const noticeService = useNotice();
  const loadingService = useGlobalLoading();
  const userService = useUser();

  const editUserProfile = async (submitData: any): Promise<User | undefined> => { 
    try {
      loadingService.showLoading();
      const user = await userService.update(submitData);
      noticeService.success(SUCCESS_IN_UPDATE_USER);
      loadingService.hideLoading();
      return user;
    } catch (error: unknown) {
      loadingService.hideLoading();
      const isTypeSafeError = error instanceof Error;
      noticeService.error(`${FAIL_TO_UPDATE_USER}\n${isTypeSafeError && error.message}`);
    }
  };

  return {
    editUserProfile
  }
}