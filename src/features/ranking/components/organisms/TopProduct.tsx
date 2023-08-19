import { SelectedSkillsList } from "@/components/molecules/SkillList/SelectedSkillsList"
import { PeriodLikeSum } from "../../types/PeriodlLikeSum"

type Props = {
  periodLikeSum:  PeriodLikeSum
}

export const TopProduct = ({ periodLikeSum }: Props): JSX.Element => {

  if (!periodLikeSum) return <></>

  return (
    <div className="flex flex-col  sm:w-sm md:w-md lg:w-lg ">
      <div className="flex flex-row  bg-white rounded-md shadow-sm">
        <div className="flex justify-center items-center w-1/2 h-60">
          <video
            src={periodLikeSum.product.url}
            controls
            className="w-full max-w-full h-full rounded-sm"
          ></video>
        </div>
        <div className="flex flex-col w-1/2 p-2 gap-y-1">
          <div className="text-3xl">🥇</div>
          <section>
            <p className="text-sm">プロダクト名</p>
            <p className="font-semibold text-md">{periodLikeSum.product.name}</p>            
          </section>
          <SelectedSkillsList 
            selectedSkillsDescription="技術選定"
            selectedSkills={periodLikeSum.product.skills}
          />
        </div>
      </div>
    </div>
  )
}