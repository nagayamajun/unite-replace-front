import { useGlobalLoading } from "@/adapters/globalState.adapter";
import { useNotice } from "@/adapters/notice.adapter";
import { useRecruit } from "@/adapters/recruit.adapter";
import { CreateRecruitInputType } from "@/domein/recruit";

export const useCreateRecruit = () => {
  const recruit = useRecruit();
  const loadingService = useGlobalLoading();
  const noticeService = useNotice();

  const createRecruit = async (data: CreateRecruitInputType) => {

    try {
      const { numberOfApplicants, ...rest } = data;
      
      loadingService.showLoading();
      const response = await recruit.create(data);
      loadingService.hideLoading();
      noticeService.success();

      return response?.id
    } catch (error: unknown) {
      loadingService.hideLoading();
      noticeService.error();

      return null
    }
  }

  return {
    createRecruit
  }
}