import { axiosInstance } from "@/libs/axios";

export const commentRepository = {
  async createComment(commentDate: any) {
    try {
      await axiosInstance.post('/comment', commentDate);
      return { message: "募集作成に成功しました。", success: true };
    } catch (error) {
      return { message: "募集作成に失敗しました。", success: false };
    }
  },

  async updateCommentInfo(id: string, data: any) {
    return await axiosInstance.put(`/comment/${id}`, data);
  }
};
