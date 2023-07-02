import { recruitRepository } from "@/modules/recruit/recruit.repository";
import { useEffect, useState } from "react";

export const useOwnRecruitsByUserId = (userId: string) => {
  const [ownRecruits, setOwnRecruits] = useState<any>();

  useEffect(() => {
    (async () => {
      const fetchedRecruits = await recruitRepository.getRecruitsByUserId(
        userId
      );
      setOwnRecruits(fetchedRecruits);
    })();
  }, []);

  return { ownRecruits };
};
