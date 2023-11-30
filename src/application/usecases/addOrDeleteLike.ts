import { useNotice } from "@/adapters/notice.adapter"
import { useUserToRecruitLike } from "@/adapters/userToRecruit.adapter";

export const useAddOrDeleteLikeToRecruit = () => {
  const noticeService = useNotice();
  const like = useUserToRecruitLike();

  const addOrDeleteLike = async({recruitId, isLiked}: {recruitId: string, isLiked: boolean}) => {
    if (!isLiked) {
      try {
        await like.add(recruitId);
      } catch (error) {
        const isTypeSafeError = error instanceof Error;
        noticeService.error(`いいねをすることに失敗しました。\n${isTypeSafeError && error.message}`);
      }
    } else if (isLiked) {
      try {
        await like.delete(recruitId);
      } catch (error) {
        const isTypeSafeError = error instanceof Error;
        noticeService.error(`いいねの削除に失敗しました。\n${isTypeSafeError && error.message}`);
      }
    };
  };

  return {
    addOrDeleteLike
  }
}