import { Recruit } from "@/domein/recruit";
import { UserRecruitParticipant } from "@/domein/recruitParticipant";
import { UserState } from "@/stores/atoms"
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil"

export const useCheckParticipantStatus = (recruit: Recruit) => {
  const user = useRecoilValue(UserState);
  const [isParticipant, setIsParticipant] = useState<boolean>();

  useEffect(() => {
    const checkParticipant = recruit?.userRecruitParticipant?.some(
      (participant: UserRecruitParticipant) => participant.userId === user?.id
    );
    setIsParticipant(checkParticipant);
  }, [recruit]);

  return {
    isParticipant,
    setIsParticipant
  }
}