import { useEffect, useState } from "react";
import { PeriodLikeSum } from "../types/PeriodlLikeSum";
import { PeriodLikeSumRepository } from "../modules/period-like-sum/period-like-sum.repository";
import { useLoading } from "@/hooks/useLoading";


export const useTopTenPeriodLikeSums = () => {
  const { showLoading, hideLoading } = useLoading();
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