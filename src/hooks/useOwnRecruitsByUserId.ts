import { useEffect, useState } from "react";

export const useOwnRecruitsByUserId = (userId: string) => {
  const [ownRecruits, setOwnRecruits] = useState<any>();

  useEffect(() => {
    (async () => {
      // if (!uid) return;
      // const fetchedRecruits = await recruitRepository.findManyByUid(uid);
      // setOwnRecruits(fetchedRecruits);
    })();
  }, []);

  return { ownRecruits };
};
