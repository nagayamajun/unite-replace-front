import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";
import { UserRecruitApplicationWithRoomId } from "@/features/chat/types/userRecruilApplication";

export const UserRecruitApplicationRepository = {
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
