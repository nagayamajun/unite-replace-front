import { Loading } from "@/components/templetes/common/Loading";
import { UserState } from "@/global-states/atoms";
import {  useRecoilValue } from "recoil";
import { RecruitCard } from "./RecruitCard";
import { useRecruits } from "@/hooks/useRecruits";
import { recruitAtomState } from "@/global-states/recruitAtom";
import { filteredRecruitAtomState } from "@/global-states/filteredRecruits";
import Link from "next/link";


export const RecruitList = (): JSX.Element => {
  const user = useRecoilValue(UserState);

  // const { recruits } =  useRecruits()
  const recruits = useRecoilValue(recruitAtomState);
  const filteredRecruits = useRecoilValue(filteredRecruitAtomState);
  if (recruits.length === 0) return <Loading />

  type RecruitCardProps = {
    id: string;
    createdAt: Date;
    headline: string;
    programingSkills: string[];
    hackthonName?: string;
  };

  return (
    <div className="bg-gray-100 pt-10 ">
      <div className="grid mx-12 sm:mx-20 gap-x-20 gap-y-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
          {filteredRecruits.length == 0 && <p>条件に一致する募集はありません</p>}
          { filteredRecruits?.map((recruit: RecruitCardProps) => {
              return (
                //useridができたら自分の投稿が表示されないようにする
                //現状はuserIDがなかったので記述を消してます
                <RecruitCard
                  id={recruit.id}
                  createdAt={recruit.createdAt}
                  headline={recruit.headline}
                  programingSkills={recruit.programingSkills}
                  hackthonName={recruit.hackthonName}
                />
              );
          })}
      </div>

      <div className="fixed bottom-0 right-0 mr-10 mb-10 bg-green-400 h-14 w-14 sm:w-20 sm:h-20 rounded-full flex col items-center justify-center">
        <Link href={"/addRecruit"} className="text-white text-4xl font-bold">
          +
        </Link>
      </div>
    </div>
  );

};
