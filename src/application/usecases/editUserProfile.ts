import { useNotice } from "@/adapters/notice.adapter"
import { useUser } from "@/adapters/user.adapter";
import { FAIL_TO_UPDATE_USER, SUCCESS_IN_UPDATE_USER } from "@/constants/constants";
import { User } from "@/domein/user";
import { useLoading } from "@/hooks/useLoading";

export const useEditUserProfile = () => {
  const notice = useNotice();
  const loading = useLoading();
  const userService = useUser();

  const editUserProfile = async (submitData: any): Promise<User | undefined> => { 
    try {
      loading.showLoading();
      const user = await userService.update(submitData);
      notice.success(SUCCESS_IN_UPDATE_USER);
      loading.hideLoading();
      return user;
    } catch (error: unknown) {
      loading.hideLoading();
      const isTypeSafeError = error instanceof Error;
      notice.error(`${FAIL_TO_UPDATE_USER}\n${isTypeSafeError && error.message}`);
    }
  };

  return {
    editUserProfile
  }
}