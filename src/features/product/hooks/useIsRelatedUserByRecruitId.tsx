import { userRecruitParticipantRepository } from "@/features/recruit/modules/user-recruit-participant/userRecruitParticipant.repository";
import { useLoading } from "@/hooks/useLoading";
import { useEffect, useState } from "react";

export const useIsRelatedUserByRecruitId = (recruitId?: string) => {
  const { showLoading, hideLoading } = useLoading();
  const [isRelatedUser, setIsRelatedUser] = useState<boolean>(false);

  useEffect(() => {
    if (!recruitId) return;
    (async () => {
      showLoading();
      const isRelated =
        await userRecruitParticipantRepository.isRelatedUserByRecruitId(
          recruitId
        );
      setIsRelatedUser(isRelated);
      hideLoading();
    })();
  }, [recruitId]);

  return { isRelatedUser };
};
