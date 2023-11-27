import { useNotice } from "@/adapters/notice.adapter"
import { useRecruit } from "@/adapters/recruit.adapter";
import { CreateRecruitInputType } from "@/domein/recruit";
import { useLoading } from "@/hooks/useLoading";

export const useEditRecruit = () => {
  const notice = useNotice();
  const loading = useLoading();
  const recruitService = useRecruit();

  const editRecruit = async({id, input}: {id: string, input: CreateRecruitInputType}) => {
    try {
      loading.showLoading();
      await recruitService.edit({id, input});
      loading.hideLoading();
      notice.success("募集情報の編集に成功しました。");
    } catch (error: unknown) {
      loading.hideLoading();
      const isTypeSafeError = error instanceof Error;
      notice.error(`募集情報の更新に失敗しました。\n${isTypeSafeError && error.message}`);
    }
  };

  return {
    editRecruit
  }
}