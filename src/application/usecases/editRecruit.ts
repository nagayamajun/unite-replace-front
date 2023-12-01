import { useGlobalLoading } from "@/adapters/globalState.adapter";
import { useNotice } from "@/adapters/notice.adapter"
import { useRecruit } from "@/adapters/recruit.adapter";
import { CreateRecruitInputType } from "@/domein/recruit";

export const useEditRecruit = () => {
  const noticeService = useNotice();
  const loadingService = useGlobalLoading();
  const recruitService = useRecruit();

  const editRecruit = async({id, input}: {id: string, input: CreateRecruitInputType}) => {
    try {
      loadingService.showLoading();
      await recruitService.edit({id, input});
      loadingService.hideLoading();
      noticeService.success("募集情報の編集に成功しました。");
    } catch (error: unknown) {
      loadingService.hideLoading();
      const isTypeSafeError = error instanceof Error;
      noticeService.error(`募集情報の更新に失敗しました。\n${isTypeSafeError && error.message}`);
    }
  };

  return {
    editRecruit
  }
}