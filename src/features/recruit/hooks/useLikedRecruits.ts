import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository"
import { Recruit } from "@/features/recruit/types/recruit"
import { useEffect, useState } from "react"

export const useLikedRecruits = () => {
  const [ likedRecruits, setLikedRecruits ] = useState<Recruit[]>([])

  useEffect(() => {
    (async () => {
      await recruitRepository.getLikedRecruits().then(res => setLikedRecruits(res))
    })()
  }, [])

  return {
    likedRecruits
  }
}