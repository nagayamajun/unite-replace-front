import { MyRecruitsList } from "../organisms/List/MyRecruitsList"
import { RelatedRecruitsList } from "../organisms/List/RelatedRecruitsList"
import { ReturnToHomeButton } from "@/components/molecules/Button/ReturnToHomeButton"


export const MyRecruitsAndRelatedRecruits = () => {
  return (
    <div className="flex flex-col items-center h-screen w-full space-y-10">
      {/* 自分で作成した募集 */}
      <MyRecruitsList />

      {/* 自分に関連する募集 */}
      <RelatedRecruitsList />

      <ReturnToHomeButton />
    </div>
  )
}
