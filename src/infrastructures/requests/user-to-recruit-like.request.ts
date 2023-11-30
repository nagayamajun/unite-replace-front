import { axiosInstance } from "@/libs/axios"

export const userToRecruitLikeRequest = {
  async add(recruitId: string): Promise<void> {
    await axiosInstance.post('/user-to-recruit-like', { recruitId })
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/user-to-recruit-like/${id}`);
  }
};