import { useNotice } from "@/adapters/notice.adapter"
import { useRecruit } from "@/adapters/recruit.adapter";

export const useDeleteRecruit = () => {
  const noticeService = useNotice();
  const recruitService = useRecruit();

  const deleteRecruit = async(id: string) => {
    try {
      await recruitService.delete(id);
      return true
    } catch (error: unknown) {
      const isTypeSafeError = error instanceof Error;
      noticeService.error(`削除に失敗しました。${isTypeSafeError && error.message}`);
      return false
    }
  };

  return {
    deleteRecruit
  }
}