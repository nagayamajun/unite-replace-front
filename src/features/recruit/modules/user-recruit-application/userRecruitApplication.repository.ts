import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";
import {
  UserRecruitApplication,
  UserRecruitApplicationWithRoomId,
} from "@/features/chat/types/userRecruilApplication";
import {
  FAIL_TO_GET_APPLICATION_INFO,
} from "@/constants/constants";

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
        console.log(error)
        throw new Error(`${FAIL_TO_GET_APPLICATION_INFO}\n${error.message}`);
      }
      throw error;
    }
  },

  async applyFor(
    userRecruitId: string
  ): Promise<UserRecruitApplicationWithRoomId> {
    try {
      const applicationWithRoomId = (
        await axiosInstance.post("/user-recruit-application", {
          recruitId: userRecruitId,
        })
      ).data;
      return applicationWithRoomId;
    } catch (error) {
      throw error;
    }
  },
};
