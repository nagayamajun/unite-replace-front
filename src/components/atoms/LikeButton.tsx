
import { userToRecruitLikeRepository } from "@/modules/user-recruit-like/userToRecruitLikeRepository";
import { useRouter } from "next/router";

type LikeButtonProps = {
  recruitId: string
  isLiked: boolean
}

export const LikeButton = ({ recruitId, isLiked }: LikeButtonProps) => {
  const router = useRouter()
  const handleLike = async() => {
    if (!isLiked) {
      await userToRecruitLikeRepository.addLike(recruitId)
    } else {
      await userToRecruitLikeRepository.deleteLike(recruitId)
    }
    router.reload()
  }

  return (
    <div>
      <button onClick={handleLike}>
        { isLiked ? 'いいね済み' : 'いいねする' }
      </button>
    </div>
  )
}