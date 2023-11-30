import { useGlobalUser } from "@/adapters/globalState.adapter";
import { Recruit } from "@/domein/recruit";
import { UserRecruitParticipant } from "@/domein/recruitParticipant";
import { useEffect, useState } from "react";

export const useCheckParticipantStatus = (recruit: Recruit) => {
  // const user = useRecoilValue(UserState);
  const { user } = useGlobalUser();
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