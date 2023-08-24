import { useRouter } from "next/router";
import { useState } from "react";
import { FcLike } from 'react-icons/fc';
import { HiOutlineHeart } from "react-icons/hi";
import { SuccessOrFailureModal } from "../../../../../components/organisms/Modal/SuccessOrFailureModal";
import { employeeToProductLikeRepository } from "@/features/product/modules/employee-product-like.ts/employeeToProductLikeRepository";
import { Product } from "@/features/product/types/product";
import { useRecoilValue } from "recoil";
import { EmployeeState } from "@/stores/employeeAtom";
import { Loading } from "@/components/organisms/Loading/Loading";


type LikeButtonProps = {
  product: Product
}

export const ProductLikeButton = ({ product }: LikeButtonProps) => {
  const router = useRouter();
  const employee = useRecoilValue(EmployeeState);
  if (!product.employeeToProductLikes) return <Loading />

  //いいねをしているかしていないかの判定に利用する
  const isInitialLiked = product.employeeToProductLikes.some(
    (like) => like.employeeId === employee?.id
  );

  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false);

  const [ isLiked, setIsLiked ] = useState<boolean>(isInitialLiked)
  
  const handleLike = async() => {
    await employeeToProductLikeRepository.addLike(product.id)
      .then((result) => {
        if (result && !result?.success) {
          setIsOpen(true);
          setModalMessage(result.message);
          setColor(result.success);

          setTimeout(
            () => {
              router.reload();
            },
            4000
          );
        }
      });

    setIsLiked((prev) => !prev)
  }

  return (
    <div>
      <button onClick={handleLike} className="text-2xl" disabled={isLiked}>
        { isLiked ? <FcLike /> : <HiOutlineHeart /> }
      </button>

      <SuccessOrFailureModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalMessage={modalMessage}
        modalBgColor={color!}
      />
    </div>
  )
}

