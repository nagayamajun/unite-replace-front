import { axiosInstance } from "@/libs/axios";

export const recruitApplicationRequest = {
  async findByApplicantIdAndRecruitId(recruitId: string) {
    const response = (
      await axiosInstance.get(
        `/user-recruit-application/find-by-applicant-id-and-recruit-id/${recruitId}`
      )
    ).data;
    return response;
  },

  async applyFor(recruitId: string) {
    const response = (
      await axiosInstance.post("/user-recruit-application", {
        recruitId,
      })
    ).data;
    return response;
  }
}