import { useEffect, useState } from "react";
import { PeriodLikeSum } from "../types/PeriodlLikeSum";
import { PeriodLikeSumRepository } from "../modules/period-like-sum/period-like-sum.repository";
import { useGlobalLoading } from "@/adapters/globalState.adapter";


export const useTopTenPeriodLikeSums = () => {
  const { showLoading, hideLoading } = useGlobalLoading();
  const [topTenPeriodLikeSums, setTopTenPeriodLikeSums] = useState<PeriodLikeSum[]>([])

  useEffect(() => {
    (async () => {
      showLoading();
      const fetchedPeriodLikeSums = await PeriodLikeSumRepository.getTopTenPeriodLikeSums();
      setTopTenPeriodLikeSums(fetchedPeriodLikeSums);
      hideLoading();
    })()
  }, [])

  return { topTenPeriodLikeSums }
}