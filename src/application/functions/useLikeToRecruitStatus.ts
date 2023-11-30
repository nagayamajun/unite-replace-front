import { useEffect, useState } from "react";
import { UserToRecruitLike } from "../../features/recruit/types/userToRecruitLike";
import { useGlobalUser } from "@/adapters/globalState.adapter";

export type Props = {
  likes?: UserToRecruitLike[]
}
export const useLikeToRecruitStatus = ({ likes }: Props) => {
  const { user } = useGlobalUser();
  const [ isLiked, setIsLiked ] = useState<boolean>();

  //いいねをしているかしていないかの判定
  useEffect(() => {
    const isInitialLiked = likes?.some(
      (like) => like.userId === user?.id
    );
    setIsLiked(isInitialLiked)
  }, [])

  return { isLiked, setIsLiked }
}
