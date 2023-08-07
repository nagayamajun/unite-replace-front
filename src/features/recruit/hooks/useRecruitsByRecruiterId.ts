import { useEffect, useState } from "react";
import { Recruit } from "../types/recruit";
import { recruitRepository } from "../modules/recruit/recruit.repository";

export const useRecruitsByRecruiterId = (recruiterId: string) => {
  const [recruitsByRecruiterId, setRecruitsByRecruiterId] = useState<Recruit[]>(
    []
  );

  useEffect(() => {
    (async () => {
      await recruitRepository
        .getRecruitsByUserId(recruiterId)
        .then((recruits) => setRecruitsByRecruiterId(recruits));
    })();
  }, []);

  return { recruitsByRecruiterId };
};
