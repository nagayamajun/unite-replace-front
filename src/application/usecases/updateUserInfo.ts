import { useNotice } from "@/adapters/notice.adapter";
import { useUser } from "@/adapters/user.adapter";
import { FAIL_TO_UPDATE_USER, SUCCESS_IN_UPDATE_USER } from "@/constants/constants";
import { useLoading } from "@/hooks/useLoading";

export const useUpdateUserInfo = () => {
  const notice = useNotice();
  const loading = useLoading();
  const userService = useUser();

  const updateUserInfo = async (submitData: any) => {
    try {
      loading.showLoading();
      await userService.update(submitData);
      notice.success(SUCCESS_IN_UPDATE_USER);
      loading.hideLoading();

      return true;
    } catch (error: unknown) {
      loading.hideLoading();
      const isTypeSafeError = error instanceof Error;
      notice.error(`${FAIL_TO_UPDATE_USER}\n${isTypeSafeError && error.message}`);

      return false;
    };
  };

  return {
    updateUserInfo
  };
};