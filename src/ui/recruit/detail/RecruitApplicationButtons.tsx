import { useLikeToRecruitStatus } from "@/application/functions/useLikeToRecruitStatus";
import { ApplyForParticipationButton } from "./ApplyForParticipationButton"
import { JumpToMessageButton } from "./JumpToMessageButton"
import { RecruitLikeButton } from "./RecruitLikeButton"
import { useAddOrDeleteLikeToRecruit } from "@/application/usecases/addOrDeleteLike";
import { useCheckParticipantStatus } from "@/application/functions/useCheckParticipantStatus";
import { useApplyForJoinToRecruit } from "@/application/usecases/applyForJoinToRecruit";
import { useSearchMyRecruitApplicationByRecruitId } from "@/application/usecases/searchMyRecruitApplicationByRecruitId";
import { useUserOnApplyFor } from "@/application/usecases/userOnApplyFor";
import { Recruit } from "@/domein/recruit";
import { useRouter } from "next/router";

type Props = {
  recruit: Recruit;
}

export const RecruitApplicationButtons = ({ recruit }: Props): JSX.Element => {
  const router = useRouter();

  // トップコンポーネントで呼ぶルールだが条件分岐をしないと行けないのでここで呼ぶ
  const { isLiked, setIsLiked } = useLikeToRecruitStatus({likes: recruit.userToRecruitLikes});
  const { addOrDeleteLike } = useAddOrDeleteLikeToRecruit();

  const { isParticipant, setIsParticipant } = useCheckParticipantStatus(recruit);
  const { applyForJoin } = useApplyForJoinToRecruit();

  const { application } = useSearchMyRecruitApplicationByRecruitId(recruit.id);
  const { onApplyFor } = useUserOnApplyFor();

  const handleLike = async() => {
    if (isLiked === undefined) return;
    await addOrDeleteLike({recruitId: recruit.id, isLiked});
    setIsLiked((prev) => !prev)
  };

  const handleApplyForJoin = async() => {
    const isSuccess = await applyForJoin(recruit?.id);
    if (isSuccess) setIsParticipant(true);
  };

  const handleOnApplyFor = async() => {
    const roomId = await onApplyFor(recruit.id);
    if(roomId !== null) router.push(`/chat/${roomId}/userChat`);
  }

  return (
    <div className="flex w-full">
      <div className="w-196 h-14 mr-6">
        <ApplyForParticipationButton
          isParticipant={isParticipant}
          handleApplyForJoin={handleApplyForJoin}
        />
      </div>
      <div className="w-196 h-14">
        <JumpToMessageButton 
          application={application}
          handleOnApplyFor={handleOnApplyFor}
        />
      </div>
      <div className="m-auto">
        <RecruitLikeButton 
          isLiked={isLiked}
          handleLike={handleLike}
        />
      </div>
    </div>
  )
}