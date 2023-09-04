import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository";
import { Recruit } from "@/features/recruit/types/recruit";
import { useLoading } from "@/hooks/useLoading";
import { useEffect, useState } from "react";

export const useMyRecruits = () => {
  const { showLoading, hideLoading } = useLoading();
  const [ myRecruits, setMyRecruits ] =  useState<Recruit[]>();

  useEffect(() => {
    (async () => {
      showLoading();
      await recruitRepository.getMyRecruits().then(res => setMyRecruits(res));
      hideLoading();
    })()
  }, [])

  return {
    myRecruits
  }
}