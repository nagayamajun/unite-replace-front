import { useNotice } from "@/adapters/notice.adapter"
import { userRecruitParticipant } from "@/adapters/userRecruitParticipant.adapter";

export const useRejectParticipant = () => {
  const notice = useNotice();
  const applicationService = userRecruitParticipant();

  const rejectParticipant = async(id: string) => {
    try {
      await applicationService.reject(id); 
    } catch (error: unknown) {
      notice.error(`削除に失敗しました。`)
    }
  };

  return {
    rejectParticipant
  }
}