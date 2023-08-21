import { userToRecruitLikeRepository } from "@/features/recruit/modules/user-recruit-like/userToRecruitLikeRepository";
import { useRouter } from "next/router";
import { useState } from "react";
import { FcLike } from 'react-icons/fc';
import { HiOutlineHeart } from "react-icons/hi";
import { SuccessOrFailureModal } from "../../../../../components/organisms/Modal/SuccessOrFailureModal";
import { Recruit } from "@/features/recruit/types/recruit";
import { useRecoilValue } from "recoil";
import { UserState } from "@/stores/atoms";
import { Loading } from "@/components/organisms/Loading/Loading";


type LikeButtonProps = {
  recruit: Recruit
}

export const RecruitLikeButton = ({ recruit }: LikeButtonProps): JSX.Element => {
  const router = useRouter();
  const user = useRecoilValue(UserState);

  if (!recruit.userToRecruitLikes) return <Loading />

  //いいねをしているかしていないかの判定に利用する
  const isInitialLiked = recruit.userToRecruitLikes.some(
    (like) => like.userId === user?.id
  );
  const [ isLiked, setIsLiked ] = useState<boolean>(isInitialLiked)

  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false);

  
  const handleLike = async() => {
    if (!isLiked) {
      await userToRecruitLikeRepository.addLike(recruit.id)
        .then((result) => {
          //処理が失敗した時のみ
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
      await userToRecruitLikeRepository.deleteLike(recruit.id)
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