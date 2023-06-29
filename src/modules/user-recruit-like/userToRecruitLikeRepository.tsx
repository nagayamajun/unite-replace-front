import { axiosInstance } from "@/libs/axios";

export const userToRecruitLikeRepository = {
  //いいねする
  async addLike(recruitId: string) {
    try {
      await axiosInstance.post('/user-to-recruit-like', { recruitId })
    } catch (error) {
      throw new Error(`いいねすることに失敗しました。 ${error}`)
    }
  },

  //いいね削除する
  async deleteLike(id: string) {
    try {
      await axiosInstance.delete(`/user-to-recruit-like/${id}`)
    } catch (error) {
      throw new Error('いいねの削除に失敗しました。')
    }
  }
};
