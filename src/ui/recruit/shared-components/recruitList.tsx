import { UserState } from "@/stores/atoms";
import { useRecoilValue } from "recoil";
import { RecruitCard } from "@/ui/recruit/shared-components/RecruitCard";
import { Recruit } from "@/domein/recruit";

type Props = {
  recruits: Recruit[]
}
export const RecruitList = ({ recruits }: Props): JSX.Element => {
  const user = useRecoilValue(UserState);

  return (
    <div className="pt-10 min-h-screen">
      <div className="w-full flex flex-col items-center md:w-[832px] md:grid gap-x-14 gap-y-8 md:grid-cols-2">
        {recruits.map((recruit: Recruit) => {
          if (user?.id !== recruit?.recruiter?.id) {
            return (
              <RecruitCard
                key={recruit.id}
                id={recruit.id}
                createdAt={recruit.createdAt}
                headline={recruit.headline}
                programingSkills={recruit.programingSkills}
                hackthonName={recruit.hackathonName}
                recruiter={recruit.recruiter}
              />
            );
          }
        })}
        {recruits.length === 0 && (
          <strong className="font-bold">条件に一致する募集はありません</strong>
        )}
      </div>
    </div>
  );
};
