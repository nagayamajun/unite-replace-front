import { axiosInstance } from "@/libs/axios";

export const userRecruitParticipantRequest = {
  async applyForJoin(recruitId: string) {
    await axiosInstance.post("/user-recruit-participant/applyForJoin", {
      userRecruitId: recruitId,
    }); 
  }, 
  async approve(id: string) {
    await axiosInstance.put(`/user-recruit-participant/${id}/approve`);
  },
  async reject(id: string) {
    await axiosInstance.delete(`/user-recruit-participant/${id}/reject`);
  }
}