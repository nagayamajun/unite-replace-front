import { FAIL_TO_DELETE_LIKE, FAIL_TO_PUSH_LIKE } from "@/constants/constants";
import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";

export const userToRecruitLikeRepository = {
  //いいねする
  async addLike(recruitId: string): Promise<ConfirmModal | undefined> {
    try {
      await axiosInstance.post('/user-to-recruit-like', { recruitId })
    } catch (error) {
      const isTypeSafeError = error instanceof Error
      return {
        success: false,
        message: `${FAIL_TO_PUSH_LIKE}\n${isTypeSafeError ? error.message : ""}`,
      }
    }
  },

  //いいね削除する
  async deleteLike(id: string): Promise<ConfirmModal | undefined> {
    try {
      await axiosInstance.delete(`/user-to-recruit-like/${id}`)
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      return {
        success: false,
        message: `${FAIL_TO_DELETE_LIKE}\n${isTypeSafeError ? error.message : ""}`,
      };
    }
  }
};
