import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository";
import { Recruit } from "@/features/recruit/types/recruit";
import { useEffect, useState } from "react";

export const useMyRecruits = () => {
  const [ myRecruits, setMyRecruits ] =  useState<Recruit[]>();

  useEffect(() => {
    (async () => {
      await recruitRepository.getMyRecruits().then(res => setMyRecruits(res));
    })()
  }, [])

  return {
    myRecruits
  }
}