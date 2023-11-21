import { userToRecruitLikeService } from "@/application/ports/userToRecruitLikeService";
import { userToRecruitLikeRequest } from "@/infrastructures/requests/user-to-recruit-like.request";

export const useUserToRecruitLike = (): userToRecruitLikeService => {
  return {
    add(recruitId) {
      return userToRecruitLikeRequest.add(recruitId)
    },
    delete(id) {
      return userToRecruitLikeRequest.delete(id)
    }
  }
}