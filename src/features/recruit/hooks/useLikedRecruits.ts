import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository"
import { Recruit } from "@/features/recruit/types/recruit"
import { useLoading } from "@/hooks/useLoading";
import { useEffect, useState } from "react"

export const useLikedRecruits = () => {
  const [ likedRecruits, setLikedRecruits ] = useState<Recruit[]>([]);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    (async () => {
      showLoading();
      await recruitRepository.getLikedRecruits().then(res => setLikedRecruits(res));
      hideLoading();
    })()
  }, [])

  return {
    likedRecruits
  }
}