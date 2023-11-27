import { useCheckParticipantStatus } from "@/application/functions/useCheckParticipantStatus";
import { useLikeToRecruitStatus } from "@/application/functions/useLikeToRecruitStatus";
import { useAddOrDeleteLikeToRecruit } from "@/application/usecases/addOrDeleteLike";
import { useApplyForJoinToRecruit } from "@/application/usecases/applyForJoinToRecruit";
import { useSearchMyRecruitApplicationByRecruitId } from "@/application/usecases/searchMyRecruitApplicationByRecruitId";
import { useUserOnApplyFor } from "@/application/usecases/userOnApplyFor";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { Recruit } from "@/domein/recruit";
import { ApplyForParticipationButton } from "@/ui/recruit/detail/ApplyForParticipationButton";
import { JumpToMessageButton } from "@/ui/recruit/detail/JumpToMessageButton";
import { RecruitLikeButton } from "@/features/recruit/components/molecules/Button/RecruitLikeButton";
import { RecruitInfo } from "@/ui/recruit/detail/RecruitInfo";
import { UserInfo } from "@/ui/recruit/detail/UserInfo";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { getRecruitById } from "@/application/usecases/getRecruit";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { getRecruit } = getRecruitById(); 

  try {
    const { recruit } = await getRecruit(id as string);
    return {
      props: { recruit }
    };
  } catch (error) {
    return { notFound: true };
  }
}

type Props = {
  recruit: Recruit
}

const RecruitDetailPage = ({ recruit }: Props) => {
  const router = useRouter();
  // likeに関するロジック
  const { isLiked, setIsLiked } = useLikeToRecruitStatus({likes: recruit.userToRecruitLikes});
  const { addOrDeleteLike } = useAddOrDeleteLikeToRecruit();
  // 参加申請に関するロジック
  const { isParticipant, setIsParticipant } = useCheckParticipantStatus(recruit);
  const { applyForJoin } = useApplyForJoinToRecruit();
  // メッセージを送るロジック
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
    <div className="flex flex-col items-center w-base text-sm space-y-14 mb-8">
      <RecruitInfo recruit={recruit} />
      <UserInfo user={recruit.recruiter!}/>

      <div className="flex w-full ">
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
    </div>
  )
 }

 RecruitDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}
export default RecruitDetailPage

