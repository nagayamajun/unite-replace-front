import { useEffect, useState } from "react";
import { UserToRecruitLike } from "../types/userToRecruitLike";
import { useRecoilValue } from "recoil";
import { UserState } from "@/stores/atoms";

export type Props = {
  likes?: UserToRecruitLike[]
}
export const useLikeToRecruitStatus = ({ likes }: Props) => {

  const user = useRecoilValue(UserState);
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