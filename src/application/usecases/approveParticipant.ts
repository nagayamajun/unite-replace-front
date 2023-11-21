import { useNotice } from "@/adapters/notice.adapter"
import { userRecruitParticipant } from "@/adapters/userRecruitParticipant.adapter";

export const useApproveParticipant = () => {
  const notice = useNotice();
  const applicationService = userRecruitParticipant();

  const approveParticipant = async(id: string) => {
    try {
      await applicationService.approve(id); 
      notice.success("リロードしたら反映されます。")
    } catch (error: unknown) {
      notice.error(`承認に失敗しました。`)
    }
  };

  return {
    approveParticipant
  }
}