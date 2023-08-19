import { UserRecruitApplication } from "@/features/chat/types/userRecruilApplication";
import { useEffect, useState } from "react";
import { UserRecruitApplicationRepository } from "../modules/user-recruit-application/userRecruitApplication.repository";

export const useUserRecruitApplicationByApplicantIdAndRecruitId = (
  recruitId?: string
) => {
  const [application, setApplication] = useState<UserRecruitApplication>();

  useEffect(() => {
    if (!recruitId) return;

    (async () => {
      const resApplication =
        await UserRecruitApplicationRepository.findByApplicantIdAndRecruitId(
          recruitId
        );
      setApplication(resApplication);
    })();
  }, [recruitId]);

  return { application };
};
