import { FAIL_TO_DELETE_LIKE, FAIL_TO_PUSH_LIKE } from "@/constants/constants";
import { axiosInstance } from "@/libs/axios";
import { ConfirmModal } from "@/types/confirmModal";
import { ToastResult } from "@/types/toast";

export const userToRecruitLikeRepository = {
  //いいねする
  async addLike({ recruitId } :{recruitId: string}): Promise<void> {
    try {
      await axiosInstance.post('/user-to-recruit-like', { recruitId })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(FAIL_TO_PUSH_LIKE);
      }
      throw error;
    }
  },

  //いいね削除する
  async deleteLike({ id }:{ id: string }): Promise<void> {
    try {
      await axiosInstance.delete(`/user-to-recruit-like/${id}`)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(FAIL_TO_DELETE_LIKE);
      }
      throw error;
    }
  },
};
