import { RecruitCard } from "@/features/recruit/components/organisms/Card/RecruitCard"
import { Recruit } from "@/features/recruit/types/recruit"
import { useLikedRecruits } from "../../hooks/useLikedRecruits"

export const LikedRecruitList = (): JSX.Element => {
  const { likedRecruits } = useLikedRecruits();

  return (
    <div className="bg-gray-100 pt-10 w-full h-screen">
      <div className="text-center mb-10  mx-12 sm:mx-20 p-5 font-bold bg-green-300 text-white rounded-sm inline-block">いいねした募集一覧</div>
      <div className="grid mx-12 sm:mx-20 gap-x-20 gap-y-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
        {likedRecruits.length === 0 ? (
          <p>条件に一致する募集はありません</p>
        ) : (
          likedRecruits?.map((recruit: Recruit) => (
            <RecruitCard
              key={recruit.id}
              id={recruit.id}
              createdAt={recruit.createdAt}
              headline={recruit.headline}
              programingSkills={recruit.programingSkills}
              hackthonName={recruit.hackthonName}
              recruiter={recruit.recruiter}
            />
          ))
        )}
      </div>
    </div>
  )
}