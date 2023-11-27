import { useNotice } from "@/adapters/notice.adapter";
import { useRecruitApplication } from "@/adapters/recruitApplication.adapter";

export const useUserOnApplyFor = () => {
  const recruitApplicationService = useRecruitApplication();
  const notice = useNotice();

  const onApplyFor = async (recruitId: string) => {
    try {
      const response = await recruitApplicationService.applyFor(recruitId);
      return response.roomId;
    } catch (error) {
      const isTypeSafeError = error instanceof Error;
      notice.error(`メッセージルームの作成に失敗しました。${isTypeSafeError && error.message}`);
      return null
    }
  };

  return {
    onApplyFor
  }
}