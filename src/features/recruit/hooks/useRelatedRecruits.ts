import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository";
import { Recruit } from "@/features/recruit/types/recruit";
import { useEffect, useState } from "react";

export const useRelatedRecruits = () => {
  const [ relatedRecruits, setRelatedRecruit ] = useState<Recruit[]>();
  useEffect(() => {
    (async () => {
      await recruitRepository.getRelatedRecruits().then(res =>  setRelatedRecruit(res));
    })()
  }, [])

  return {
    relatedRecruits
  }
}