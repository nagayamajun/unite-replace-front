import { useEffect, useState } from "react";
import { PeriodLikeSum } from "../types/PeriodlLikeSum";
import { PeriodLikeSumRepository } from "../modules/period-like-sum/period-like-sum.repository";


export const useTopTenPeriodLikeSums = () => {
  const [topTenPeriodLikeSums, setTopTenPeriodLikeSums] = useState<PeriodLikeSum[]>([])

  useEffect(() => {
    (async () => {
      const fetchedPeriodLikeSums = await PeriodLikeSumRepository.getTopTenPeriodLikeSums();
      setTopTenPeriodLikeSums(fetchedPeriodLikeSums)
    })()
  }, [])

  return { topTenPeriodLikeSums }
}