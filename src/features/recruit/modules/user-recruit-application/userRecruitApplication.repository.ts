import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";
import {
  UserRecruitApplication,
  UserRecruitApplicationWithRoomId,
} from "@/features/chat/types/userRecruilApplication";
import {
  FAIL_TO_GET_APPLICATION_INFO,
} from "@/constants/constants";
import { ToastResult } from "@/types/toast";

export const UserRecruitApplicationRepository = {
  async findByApplicantIdAndRecruitId(
    recruitId: string
  ): Promise<UserRecruitApplication> {
    try {
      const application = (
        await axiosInstance.get(
          `/user-recruit-application/find-by-applicant-id-and-recruit-id/${recruitId}`
        )
      ).data;
      return application;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${FAIL_TO_GET_APPLICATION_INFO}\n${error.message}`);
      }
      throw error;
    }
  },

  async applyFor(
    userRecruitId: string
  // ): Promise<UserRecruitApplicationWithRoomId> {
  ): Promise<ToastResult<UserRecruitApplicationWithRoomId>> {
    try {
      const applicationWithRoomId = (
        await axiosInstance.post("/user-recruit-application", {
          recruitId: userRecruitId,
        })
      ).data;
      return {
        style: 'success',
        message: '',
        data: applicationWithRoomId
      };
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        style: 'failed',
        message: `ルームidの取得に失敗しました。\n${
          isTypeSafeError ? error.message : ""
      }`,
    }
    }
  },
};
