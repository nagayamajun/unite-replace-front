import { useNotice } from "@/adapters/notice.adapter"
import { userRecruitParticipant } from "@/adapters/userRecruitParticipant.adapter";

export const useApproveParticipant = () => {
  const noticeService = useNotice();
  const applicationService = userRecruitParticipant();

  const approveParticipant = async(id: string) => {
    try {
      await applicationService.approve(id); 
      noticeService.success("リロードしたら反映されます。")
    } catch (error: unknown) {
      noticeService.error(`承認に失敗しました。`)
    }
  };

  return {
    approveParticipant
  }
}