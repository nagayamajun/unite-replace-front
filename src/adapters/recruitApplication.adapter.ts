import { RecruitApplicationService } from "@/application/ports/recruitApplicantService";
import { recruitApplicationRequest } from "@/infrastructures/requests/recruit-application.request";

export const useRecruitApplication = (): RecruitApplicationService =>{
  return {
    findByApplicantIdAndRecruitId(recruitId) {
      return recruitApplicationRequest.findByApplicantIdAndRecruitId(recruitId);
    },
    applyFor(recruitId) {
      return recruitApplicationRequest.applyFor(recruitId)
    }
  }
}