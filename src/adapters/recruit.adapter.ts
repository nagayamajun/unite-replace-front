import { RecruitService } from "@/application/ports/recruitService";
import { recruitRequest } from "@/infrastructures/requests/recruit.request";

export const useRecruit = (): RecruitService => {
  return {
    searchRecruit(search) {
      return recruitRequest.search(search);
    },
    create(data) {
      return recruitRequest.create(data);
    },
    getByRecruitId(id) {
      return recruitRequest.getByRecruitId(id);
    },
    getByOwnLiked() {
      return recruitRequest.getByOwnLiked();
    },
    getOwn() {
      return recruitRequest.getOwn();
    },
    getRelatedOwn() {
      return recruitRequest.getRelatedOwn();
    },
    delete(id: string) {
      return recruitRequest.delete(id)
    },
    edit({id, input}) {
      return recruitRequest.edit({id, input});
    },
  }
}