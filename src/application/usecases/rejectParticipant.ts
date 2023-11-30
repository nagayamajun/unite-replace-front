import { useNotice } from "@/adapters/notice.adapter"
import { userRecruitParticipant } from "@/adapters/userRecruitParticipant.adapter";

export const useRejectParticipant = () => {
  const noticeService = useNotice();
  const applicationService = userRecruitParticipant();

  const rejectParticipant = async(id: string) => {
    try {
      await applicationService.reject(id); 
    } catch (error: unknown) {
      noticeService.error(`削除に失敗しました。`)
    }
  };

  return {
    rejectParticipant
  }
}