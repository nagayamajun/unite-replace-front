
import { userToRecruitLikeRepository } from "@/modules/user-recruit-like/userToRecruitLikeRepository";
import { useRouter } from "next/router";
import { useState } from "react";
import { FcLike } from 'react-icons/fc';
import { HiOutlineHeart } from "react-icons/hi";
import { SuccessOrFailureModal } from "../organisms/SuccessOrFailureModal";
import { employeeToProductLikeRepository } from "@/modules/employee-product-like.ts/employeeToProductLikeRepository";


type LikeButtonProps = {
  productId: string
  isPropsLiked: boolean
}

export const ProductLikeButton = ({ productId, isPropsLiked }: LikeButtonProps) => {
  const router = useRouter();

  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false);

  const [ isLiked, setIsLiked ] = useState<boolean>(isPropsLiked)
  
  const handleLike = async() => {
    await employeeToProductLikeRepository.addLike(productId)
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

