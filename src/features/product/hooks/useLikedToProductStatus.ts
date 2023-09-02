import { useEffect, useState } from "react";
import { EmployeeProductLike } from "../types/employeeToProductLike";
import { EmployeeState } from "@/stores/employeeAtom";
import { useRecoilValue } from "recoil";

type Props = {
  likedStatus: EmployeeProductLike[];
}

export const useLikedToProductStatus = ({ likedStatus }: Props) => {
  const [ isLiked, setIsLiked ] = useState<boolean>();
  const employee = useRecoilValue(EmployeeState);
  
  //いいねをしているかしていないかの判定
  useEffect(() => {
    const isInitialLiked = likedStatus?.some(
      (like) => like.employeeId === employee?.id
    );
    setIsLiked(isInitialLiked)
  }, [])

  return { isLiked, setIsLiked }
}