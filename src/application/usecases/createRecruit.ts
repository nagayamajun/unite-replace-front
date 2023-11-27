import { useNotice } from "@/adapters/notice.adapter";
import { useRecruit } from "@/adapters/recruit.adapter";
import { CreateRecruitInputType } from "@/domein/recruit";
import { useLoading } from "@/hooks/useLoading";

export const useCreateRecruit = () => {
  const recruit = useRecruit();
  const loading = useLoading();
  const notice = useNotice();

  const createRecruit = async (data: CreateRecruitInputType) => {

    try {
      const { numberOfApplicants, ...rest } = data;
      
      loading.showLoading();
      const response = await recruit.create(data);
      loading.hideLoading();
      notice.success();

      return response?.id
    } catch (error: unknown) {
      loading.hideLoading();
      notice.error();

      return null
    }
  }

  return {
    createRecruit
  }
}