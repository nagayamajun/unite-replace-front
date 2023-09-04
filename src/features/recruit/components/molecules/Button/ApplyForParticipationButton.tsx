import { userRecruitParticipantRepository } from "@/features/recruit/modules/user-recruit-participant/userRecruitParticipant.repository";
import { UserRecruitParticipant } from "@/features/recruit/types/UserRecruitParticipant";
import { Recruit } from "@/features/recruit/types/recruit";
import { UserState } from "@/stores/atoms";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";


type Props = {
  recruit: Recruit
}

export const ApplyForParticipationButton = ({ recruit }: Props):JSX.Element => {
  const user = useRecoilValue(UserState);
  const [isParticipant, setIsParticipant] = useState<boolean>();

  //userが既に応募しているかを確認する
  useEffect(() => {
    const checkParticipant = recruit?.userRecruitParticipant?.some(
      (participant: UserRecruitParticipant) => participant.userId === user?.id
    );
    setIsParticipant(checkParticipant);
  }, [recruit]);

  //参加を希望する
  const applyForJoin = async () => {
    await userRecruitParticipantRepository.applyForJoin(recruit?.id as string);
    setIsParticipant(true);
  };

  return (
    <>
      {isParticipant ? (
          <p className="text-red-500">*参加を申請しました</p>
        ) : (
          <button
            onClick={applyForJoin}
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            参加を申請する
          </button>
        )
      }
    </>
  )
}