import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FcLike } from 'react-icons/fc';
import { HiOutlineHeart } from "react-icons/hi";
import { Product } from "@/features/product/types/product";
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/stores/employeeAtom";
import { employeeToProductLikeRepository } from "@/features/product/modules/employee-product-like/employeeToProductLikeRepository";
import { useToast } from "@/hooks/useToast";
import { useLikedToProductStatus } from "@/features/product/hooks/useLikedToProductStatus";

type LikeButtonProps = {
  product: Product
}

export const ProductLikeButton = ({ product }: LikeButtonProps) => {
  const router = useRouter();
  // const employee = useRecoilValue(EmployeeState);
  const { showToast, hideToast } = useToast();
  
  // const [ isLiked, setIsLiked ] = useState<boolean>();

  // useEffect(() => {
  //   //いいねをしているかしていないかの判定に利用する
  //   const isInitialLiked = product.employeeToProductLikes?.some(
  //     (like) => like.employeeId === employee?.id
  //   );
  //   setIsLiked(isInitialLiked)
  // }, [])
  
  if (!product.employeeToProductLikes) return <></>
  const { isLiked, setIsLiked } = useLikedToProductStatus({ likedStatus: product.employeeToProductLikes })
  const handleLike = async () => {
    const result = await employeeToProductLikeRepository.addLike({ productId: product.id });
    if (result && result.style === 'failed') {
      showToast({ message: result.message, style: result.style });

      setTimeout(() => {
        hideToast();
        router.reload();
      }, 4000);
    } else {
      setIsLiked((prev) => !prev);
    }
  };

  return (
    <div>
      <button onClick={handleLike} className="text-2xl" disabled={isLiked}>
        { isLiked ? <FcLike /> : <HiOutlineHeart /> }
      </button>
      {isLiked && <p>いいねを削除することはできません。</p>}
    </div>
  )
}

