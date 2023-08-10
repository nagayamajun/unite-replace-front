import { userRecruitParticipantRepository } from "@/features/recruit/modules/user-recruit-participant/userRecruitParticipant.repository";
import { useEffect, useState } from "react";

export const useIsRelatedUserByRecruitId = (recruitId?: string) => {
  const [isRelatedUser, setIsRelatedUser] = useState<boolean>(false);

  useEffect(() => {
    if (!recruitId) return;
    (async () => {
      const isRelated =
        await userRecruitParticipantRepository.isRelatedUserByRecruitId(
          recruitId
        );
      setIsRelatedUser(isRelated);
    })();
  }, [recruitId]);

  return { isRelatedUser };
};
