import { RecruitService } from "@/application/ports/recruitService";
import { recruitRequest } from "@/infrastructures/requests/recruit.request";

export const useRecruit = (): RecruitService => {
  return {
    searchRecruit(search) {
      return recruitRequest.search(search);
    },
    create(data) {
      return recruitRequest.create(data);
    }
  }
}