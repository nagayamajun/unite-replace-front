import { FAIL_TO_APPROVE_PARTICIPANT, FAIL_TO_REJECT_PARTICIPANT, SUCCESS_TO_APPROVE_PARTICIPANT, SUCCESS_TO_REJECT_PARTICIPANT } from "@/constants/constants";
import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";
import { type } from "os";

export const userRecruitParticipantRepository = {
  //参加依頼を送る
  async applyForJoin(userRecruitId: string) {
    try {
      await axiosInstance.post("/user-recruit-participant/applyForJoin", { userRecruitId });
      return { message: "募集主に申請しました。", success: true };
    } catch (error) {
      return { message: "募集主への申請に失敗しました。", success: false };
    }
  },

  //一件のuserRecruitに紐ずくuserRecruitPArticipantレコードを全件取得
  async findManyByUserRecruitId(recruitId: string) {
    try {
      const userRecruitParticipants = ( await axiosInstance.post('/user-recruit-participant/find-many-by-userRecruit', { recruitId })).data
      return userRecruitParticipants

    } catch (error) {
      throw new Error(`userRecruitparticipantsを取得することができませんでした。${error}`)
    }
  },

  async  approveParticipant(id: string): Promise<ConfirmModal> {
    try {
      await axiosInstance.put(`/user-recruit-participant/${id}/approve`)
      return {
        message: `${SUCCESS_TO_APPROVE_PARTICIPANT}`,
        success: true
      }
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        success: false,
        message: `${FAIL_TO_APPROVE_PARTICIPANT}\n${isTypeSafeError ? error.message : ""}`
      }
    }
  },

  async rejectParticipant(id: string): Promise<ConfirmModal> {
    try {
      await axiosInstance.delete(`/user-recruit-participant/${id}/reject`)
      return {
        message: `${SUCCESS_TO_REJECT_PARTICIPANT}`,
        success: true
      }
    } catch (error) {
      const isTypeSafeError = error instanceof Error
      return {
        message: `${FAIL_TO_REJECT_PARTICIPANT}\n${isTypeSafeError ? error.message : ""}`
      }
    }
  }
};
