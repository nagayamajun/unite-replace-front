import { useGlobalLoading } from "@/adapters/globalState.adapter";
import { useNotice } from "@/adapters/notice.adapter"
import { userRecruitParticipant } from "@/adapters/userRecruitParticipant.adapter";

export const useApplyForJoinToRecruit = () => {
  const noticeService = useNotice();
  const loading = useGlobalLoading();
  const recruitParticipant = userRecruitParticipant();

  const applyForJoin = async (recruitId: string) => {
     try {
      loading.showLoading();
      await recruitParticipant.applyForJoin(recruitId);
      loading.hideLoading();
      return true;
     } catch (error: unknown) {
      loading.hideLoading();
      const isTypeSafeError = error instanceof Error;
      noticeService.error(`承認を送ることに失敗しました。\n${isTypeSafeError && error.message}`);
      return false
     }
  }

  return {
    applyForJoin
  }
}