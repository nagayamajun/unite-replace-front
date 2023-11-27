import { PersonIcon } from "@/components/molecules/Icon/PersonIcon"
import { Recruit } from "@/domein/recruit"
import { ProgrammingSkillIcons } from "@/features/user/types/programingSkill"
import Image from "next/image"

type Props = {
  recruit: Recruit
}

export const RecruitInfo = ({ recruit }: Props) => (
  <>
    <div className="mt-32 space-y-8">
      <h2 className="text-3xl text-center font-semibold">{recruit.hackathonName}</h2>
      <p className="text-center text-base">{recruit.headline}</p>
    </div>

    <div className="w-full bg-plain-gray p-6 rounded-md min-h-[120px]">
      <p className="mb-4">詳細</p>
      <div className="leading-snug rounded-md" style={{ overflowWrap: 'break-word' }}>{recruit?.details}</div>
    </div>

    <div className="w-full bg-plain-gray p-6 rounded-md min-h-[120px]">
      <p className="mb-4">開発期間</p>
      <div className="flex justify-between px-6">
        <div>{recruit.developmentStartDate}</div>
        <div>{recruit.developmentEndDate}</div>
      </div>
    </div>

    <div className="flex w-full bg-plain-gray p-6 rounded-md h-16">
      <p className="mr-8">募集人数</p>
      <div className="flex justify-between w-40">
        <div>{recruit.numberOfApplicants}</div>
        { recruit.numberOfApplicants < 2 && (
          <strong className="text-red-500">*残りわずか</strong>
        )}
      </div>
    </div>

    <div className="w-full bg-plain-gray p-6 rounded-md min-h-[120px]">
      <p className="mb-4">ハッカソンURL</p>
      <div className="leading-snug rounded-md" style={{ overflowWrap: 'break-word' }}>{recruit?.hackathonUrl}</div>
    </div>

    <div className="flex border border-gray-300 rounded-md w-full min-h-[120px] p-6">
      { recruit.programingSkills.map((skill) => {
        return (
          <div key={skill} className="w-1/3 flex space-x-4 items-center">
            <Image src={ProgrammingSkillIcons[skill]} alt={skill} width={48} height={48} />
            <p>{skill}</p>
          </div>
        )
      })}
    </div>
  </>
)