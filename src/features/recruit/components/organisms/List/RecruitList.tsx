import { UserState } from "@/stores/atoms";
import { useRecoilValue } from "recoil";
import { RecruitCard } from "../Card/RecruitCard";
import { recruitAtomState } from "@/features/recruit/stores/recruitAtom";
import Link from "next/link";
import { User } from "@/features/user/types/user";
import { useRouter } from "next/router";
import { ProgrammingSkill } from "@/features/user/types/programingSkill";

export const RecruitList = (): JSX.Element => {
  const router = useRouter();
  const user = useRecoilValue(UserState);

  const recruits = useRecoilValue(recruitAtomState);

  const filteredRecruits = recruits.filter((recruit) => {
    const name = router.query.name as string;
    const skills = router.query.skills as ProgrammingSkill[];

    switch (true) {
      case !!name && skills?.length > 0:
        return (
          recruit.hackthonName?.includes(name) &&
          recruit.programingSkills.some((skill) => skills.includes(skill))
        );
      case !!name:
        return recruit.hackthonName?.includes(name);
      case skills?.length > 0:
        return recruit.programingSkills.some((skill) => skills.includes(skill));
      default:
        return true;
    }
  });

  type RecruitCardProps = {
    id: string;
    recruiter?: User;
    createdAt: Date;
    headline: string;
    programingSkills: ProgrammingSkill[];
    hackthonName?: string;
  };

  return (
    <div className="bg-gray-50 pt-10 min-h-screen px-8 sm:px-10 md:px-12">
      <div className="grid gap-x-14 gap-y-8 sm:grid-cols-1 lg:grid-cols-2 ">
        {filteredRecruits.map((recruit: RecruitCardProps) => {
          if (user?.id !== recruit?.recruiter?.id) {
            return (
              <RecruitCard
                key={recruit.id}
                id={recruit.id}
                createdAt={recruit.createdAt}
                headline={recruit.headline}
                programingSkills={recruit.programingSkills}
                hackthonName={recruit.hackthonName}
                recruiter={recruit.recruiter!}
              />
            );
          }
        })}
        {filteredRecruits.length === 0 && (
          <p className="font-bold">条件に一致する募集はありません</p>
        )}
      </div>

      <Link
        href={"/recruit/addRecruit"}
        className="text-white text-4xl font-bold fixed bottom-0 right-0 mr-10 mb-10 bg-green-400 h-14 w-14 sm:w-20 sm:h-20 rounded-full flex col items-center justify-center"
      >
        +
      </Link>
    </div>
  );
};
