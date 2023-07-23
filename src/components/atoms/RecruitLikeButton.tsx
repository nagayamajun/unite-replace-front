
import { userToRecruitLikeRepository } from "@/modules/user-recruit-like/userToRecruitLikeRepository";
import { useRouter } from "next/router";
import { useState } from "react";
import { FcLike } from 'react-icons/fc';
import { HiOutlineHeart } from "react-icons/hi";
import { SuccessOrFailureModal } from "../organisms/SuccessOrFailureModal";


type LikeButtonProps = {
  recruitId: string
  isPropsLiked: boolean
}

export const RecruitLikeButton = ({ recruitId, isPropsLiked }: LikeButtonProps) => {
  const router = useRouter();

  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false);

  const [ isLiked, setIsLiked ] = useState<boolean>(isPropsLiked)
  
  const handleLike = async() => {
    if (!isLiked) {
      await userToRecruitLikeRepository.addLike(recruitId)
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
    } else {
      await userToRecruitLikeRepository.deleteLike(recruitId)
    }
    setIsLiked((prev) => !prev)
  }

  return (
    <div>
      <button onClick={handleLike} className="text-2xl">
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