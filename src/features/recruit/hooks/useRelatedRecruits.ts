import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository";
import { Recruit } from "@/features/recruit/types/recruit";
import { useLoading } from "@/hooks/useLoading";
import { useEffect, useState } from "react";

export const useRelatedRecruits = () => {
  const { showLoading, hideLoading } = useLoading();
  const [ relatedRecruits, setRelatedRecruit ] = useState<Recruit[]>();
  useEffect(() => {
    (async () => {
      showLoading();
      await recruitRepository.getRelatedRecruits().then(res =>  setRelatedRecruit(res));
      hideLoading();
    })()
  }, [])

  return {
    relatedRecruits
  }
}