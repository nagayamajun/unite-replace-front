import {
  FAIL_TO_APPROVE_PARTICIPANT,
  FAIL_TO_GET_PARTICIPANT,
  FAIL_TO_JUDGE_WHETHER_RELATED_USER,
  FAIL_TO_REJECT_PARTICIPANT,
  SUCCESS_TO_APPROVE_PARTICIPANT,
  SUCCESS_TO_REJECT_PARTICIPANT,
} from "@/constants/constants";
import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";
import { ToastResult } from "@/types/toast";
import { type } from "os";

export const userRecruitParticipantRepository = {
  //参加依頼を送る
  async applyForJoin(userRecruitId: string) {
    try {
      await axiosInstance.post("/user-recruit-participant/applyForJoin", {
        userRecruitId,
      });
      return { message: "募集主に申請しました。", success: true };
    } catch (error) {
      return { message: "募集主への申請に失敗しました。", success: false };
    }
  },

  //一件のuserRecruitに紐ずくuserRecruitPArticipantレコードを全件取得
  async findManyByUserRecruitId(recruitId: string) {
    try {
      const userRecruitParticipants = (
        await axiosInstance.post(
          "/user-recruit-participant/find-many-by-userRecruit",
          { recruitId }
        )
      ).data;
      return userRecruitParticipants;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${FAIL_TO_GET_PARTICIPANT}\n${error.message}`);
      }
      throw error;
    }
  },

  //一件のuserRecruitに紐ずく参加承認済み (isApproved = true) のuserRecruitParticipantレコードを全件取得
  async findManyApprovedParticipantsByUserRecruitId(recruitId: string) {
    try {
      const userRecruitParticipants = (
        await axiosInstance.get(
          `/user-recruit-participant/find-many-approved-by-user-recruit-id/${recruitId}`
        )
      ).data;
      return userRecruitParticipants;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${FAIL_TO_GET_PARTICIPANT}\n${error.message}`);
      }
      throw error;
    }
  },

  async isRelatedUserByRecruitId(recruitId: string) {
    try {
      const isRelatedUser = (
        await axiosInstance.get(
          `/user-recruit-participant/is-related-user-by-recruit-id/${recruitId}`
        )
      ).data;
      return isRelatedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `${FAIL_TO_JUDGE_WHETHER_RELATED_USER}\n${error.message}`
        );
      }
      throw error;
    }
  },

  async approveParticipant(id: string): Promise<ToastResult> {
    try {
      await axiosInstance.put(`/user-recruit-participant/${id}/approve`);
      return {
        style: 'success',
        message: SUCCESS_TO_APPROVE_PARTICIPANT,
      };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: 'failed',
        message: `${FAIL_TO_APPROVE_PARTICIPANT}\n${
          isTypeSafeError ? error.message : ""
        }`,
      };
    }
  },

  async rejectParticipant(id: string): Promise<ToastResult> {
    try {
      await axiosInstance.delete(`/user-recruit-participant/${id}/reject`);
      return {
        message: `${SUCCESS_TO_REJECT_PARTICIPANT}`,
        style: 'failed',
      };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        message: `${FAIL_TO_REJECT_PARTICIPANT}\n${
          isTypeSafeError ? error.message : ""
        }`,
        style: 'failed'
      };
    }
  },
};
