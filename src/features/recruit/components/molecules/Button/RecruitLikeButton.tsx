import { userToRecruitLikeRepository } from "@/features/recruit/modules/user-recruit-like/userToRecruitLikeRepository";
import { useRouter } from "next/router";
import { FcLike } from 'react-icons/fc';
import { HiOutlineHeart } from "react-icons/hi";
import { Recruit } from "@/features/recruit/types/recruit";
import { useToast } from "@/hooks/useToast";
import { useLikeToRecruitStatus } from "@/features/recruit/hooks/useLikeToRecruitStatus";

type LikeButtonProps = {
  recruit: Recruit
}

export const RecruitLikeButton = ({ recruit }: LikeButtonProps): JSX.Element => {
  const router = useRouter();
  const { showToast, hideToast } = useToast();

  if  (!recruit.userToRecruitLikes) return <></>
  const { isLiked, setIsLiked } = useLikeToRecruitStatus({likes: recruit.userToRecruitLikes});

  const handleLike = async() => {
    if (!isLiked) {
      try {
        await userToRecruitLikeRepository.addLike({ recruitId: recruit.id })
      } catch (error) {
        showToast({ message: (error as Error).message, style: 'failed'});
        setTimeout(
          () => {
            hideToast();
            router.reload();
          },
          4000
        );
      };
    } else {
      try {
        await userToRecruitLikeRepository.deleteLike({id: recruit.id})
      } catch (error) {
        showToast({ message: (error as Error).message, style: 'failed'});
        setTimeout(
          () => {
            hideToast();
            router.reload();
          },
          4000
        );
      };
    }
    setIsLiked((prev) => !prev)
  }

  return (
    <div>
      <button onClick={handleLike} className="text-2xl">
        { isLiked ? <FcLike /> : <HiOutlineHeart /> }
      </button>
    </div>
  )
}