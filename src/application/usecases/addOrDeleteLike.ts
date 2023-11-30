import { useNotice } from "@/adapters/notice.adapter"
import { useUserToRecruitLike } from "@/adapters/userToRecruit.adapter";

export const useAddOrDeleteLikeToRecruit = () => {
  const notice = useNotice();
  const like = useUserToRecruitLike();

  const addOrDeleteLike = async({recruitId, isLiked}: {recruitId: string, isLiked: boolean}) => {
    if (!isLiked) {
      try {
        await like.add(recruitId);
      } catch (error) {
        const isTypeSafeError = error instanceof Error;
        notice.error(`いいねをすることに失敗しました。\n${isTypeSafeError && error.message}`);
      }
    } else if (isLiked) {
      try {
        await like.delete(recruitId);
      } catch (error) {
        const isTypeSafeError = error instanceof Error;
        notice.error(`いいねの削除に失敗しました。\n${isTypeSafeError && error.message}`);
      }
    };
  };

  return {
    addOrDeleteLike
  }
}