import { recruitRepository } from "@/modules/recruit/recruit.repository";
import { Recruit } from "@/types/recruit";
import { useEffect, useState } from "react";

export const useRelatedRecruitsByUserId = (userId: string) => {
  const [relatedRecruits, setRelatedRecruits] = useState<Recruit[]>();

  useEffect(() => {
    (async () => {
      const fetchedRecruits =
        await recruitRepository.getRelatedRecruitsByUserId(userId);
      setRelatedRecruits(fetchedRecruits);
    })();
  }, []);

  return { relatedRecruits };
};
