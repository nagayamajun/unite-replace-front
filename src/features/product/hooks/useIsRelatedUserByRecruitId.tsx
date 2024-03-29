import { useGlobalLoading } from "@/adapters/globalState.adapter";
import { userRecruitParticipantRepository } from "@/features/product/modules/user-recruit-participant/userRecruitParticipant.repository";
import { useEffect, useState } from "react";

export const useIsRelatedUserByRecruitId = (recruitId?: string) => {
  const { showLoading, hideLoading } = useGlobalLoading();
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
