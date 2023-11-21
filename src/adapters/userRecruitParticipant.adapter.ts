import { recruitParticipantService } from "@/application/ports/recruitParticipantService";
import { userRecruitParticipantRequest } from "@/infrastructures/requests/recruit-participant.request"

export const userRecruitParticipant = (): recruitParticipantService => {
  return {
    applyForJoin(recruitId) {
      return userRecruitParticipantRequest.applyForJoin(recruitId);
    },
    approve(id: string) {
      return userRecruitParticipantRequest.approve(id);
    },
    reject(id: string) {
      return userRecruitParticipantRequest.reject(id);
    }
  }
}