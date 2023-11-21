import { useNotice } from "@/adapters/notice.adapter"
import { userRecruitParticipant } from "@/adapters/userRecruitParticipant.adapter";
import { useLoading } from "@/hooks/useLoading";

export const useApplyForJoinToRecruit = () => {
  const notice = useNotice();
  const loading = useLoading();
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
      notice.error(`承認を送ることに失敗しました。\n${isTypeSafeError && error.message}`);
      return false
     }
  }

  return {
    applyForJoin
  }
}