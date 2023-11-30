import { PersonIcon } from "@/components/molecules/Icon/PersonIcon";
import { SelectedSkillsList } from "@/components/molecules/SkillList/SelectedSkillsList";
import { User } from "@/domein/user";
import { ProgrammingSkill, ProgrammingSkillIcons } from "@/features/user/types/programingSkill";
import Image from "next/image";
import Link from "next/link";

type RecruitCardProps = {
  //userのidと企業側のid両方必要
  id: string;
  createdAt: Date;
  headline: string;
  programingSkills: ProgrammingSkill[];
  hackthonName?: string;
  recruiter?: User
};

export const RecruitCard = ({
  id,
  headline,
  programingSkills,
  hackthonName,
  recruiter
}: RecruitCardProps): JSX.Element => (
  <div
    className={`bg-plain-gray overflow-hidden rounded-xl w-4/5 md:w-[400px] h-[320px] p-6 flex flex-col justify-start gap-4`}
  >
    {/* ハッカソン名 */}
    <div className="flex flex-col space-y-2">
      <p className="text-sm">ハッカソン名</p>
      <p className="text-2xl font-semibold text-black">{hackthonName}</p>
    </div>
    {/* ひとこと */}
    <div className="flex flex-col space-y-2">
      <p className="text-sm">ひとこと</p>
      <p className="text-lg line-clamp-1 ">
        {headline}
      </p>
    </div>
    {/* 募集スキル */}
    <SelectedSkillsList
      selectedSkills={programingSkills}
      selectedSkillsDescription="募集スキル"
    />

    <div className="flex justify-between mt-auto">
      <div className=" flex col items-center">
        <p className="text-sm mr-3 mb-2 sm:mb-0 sm:text-base">募集主: {recruiter?.name}</p>
        <PersonIcon 
          originalIconImageSrc={recruiter?.imageUrl}
        />
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center">
        <Link
          href={`/recruit/${id}/recruitDetail`}
          className="text-plain-green focus:outline-none focus:border-transparent text-center bg-transparent p-3"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  </div>
);
