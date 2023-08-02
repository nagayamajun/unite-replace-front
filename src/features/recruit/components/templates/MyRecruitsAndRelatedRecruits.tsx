import { UserState } from "@/stores/atoms"
import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository"
import { Recruit } from "@/features/recruit/types/recruit"
import Link from "next/link"
import { useEffect, useState } from "react"
import { MyRecruitsList } from "../organisms/List/MyRecruitsList"
import { RelatedRecruitsList } from "../organisms/List/RelatedRecruitsList"
import { ReturnToHomeButton } from "@/components/molecules/Button/ReturnToHomeButton"
import { useMyRecruits } from "../../hooks/useMyRecruits"


export const MyRecruitsAndRelatedRecruits = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen space-y-10">
      {/* 自分で作成した募集 */}
      <MyRecruitsList />

      {/* 自分に関連する募集 */}
      <RelatedRecruitsList />

      <ReturnToHomeButton />
    </div>
  )
}
