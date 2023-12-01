import { FcLike } from 'react-icons/fc';
import { HiOutlineHeart } from "react-icons/hi";

type Props = {
  handleLike: () => Promise<void>;
  isLiked: boolean | undefined
}

export const RecruitLikeButton = ({ handleLike, isLiked }: Props): JSX.Element => {
  return (
    <>
      <button onClick={handleLike} className="text-2xl">
        { isLiked ? <FcLike /> : <HiOutlineHeart /> }
      </button>
    </>
  )
}