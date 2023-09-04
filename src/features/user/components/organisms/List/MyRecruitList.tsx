import { RecruitCard } from "@/features/recruit/components/organisms/Card/RecruitCard";
import { useRecruitsByRecruiterId } from "@/features/recruit/hooks/useRecruitsByRecruiterId";
import { Recruit } from "@/features/recruit/types/recruit";
import { User } from "@/features/user/types/user";
import { useRelatedRecruitsByUserId } from "@/hooks/useRelatedRecruitsByUserId";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

type Props = {
  isMyself: boolean;
  profileUser: User
}

export const MyRecruitList = ({ isMyself, profileUser }: Props): JSX.Element => {
  const router = useRouter();
  const { id: userId } = router.query;
  const { relatedRecruits } = useRelatedRecruitsByUserId(userId as string);
  const { recruitsByRecruiterId } = useRecruitsByRecruiterId(userId as string);

  return (
    <>
      {isMyself && (
        <>
          {/* userが作成している募集 */}
          <div className="flex flex-col gap-6 w-full sm:w-4/5">
            <p>作成した募集</p>
            <div className="flex gap-4 overflow-scroll">
              {recruitsByRecruiterId && recruitsByRecruiterId.length > 0 ? (
                recruitsByRecruiterId.map(
                  (recruit: Recruit, index: number) => (
                    //以降をcomponentに切り出したい
                    <Fragment key={recruit.id}>
                      <RecruitCard
                        id={recruit.id}
                        createdAt={recruit.createdAt}
                        headline={recruit.headline}
                        programingSkills={recruit.programingSkills}
                        hackthonName={recruit.hackthonName}
                      />
                    </Fragment>
                  )
                )
              ) : (
                <p className="text-gray-500 my-16 w-full text-center">
                  募集がありません。
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Link
                hidden={!isMyself}
                href={`/profiles/${profileUser.id}/myRecruitsAndRelatedRecruits`}
                target="_blank"
              >
                もっと見る ＞
              </Link>
            </div>
          </div>
          {/* userが参加確定した募集 */}
          <div className="flex flex-col gap-6 w-full sm:w-4/5 ">
            <p>参加する/参加した募集</p>
            <div className="flex gap-4 overflow-scroll">
              {relatedRecruits && relatedRecruits.length > 0 ? (
                relatedRecruits.map((recruit: Recruit, index: number) => (
                  //以降をcomponentに切り出したい
                  <Fragment key={recruit.id}>
                    <RecruitCard
                      id={recruit.id}
                      createdAt={recruit.createdAt}
                      headline={recruit.headline}
                      programingSkills={recruit.programingSkills}
                      hackthonName={recruit.hackthonName}
                    />
                  </Fragment>
                ))
              ) : (
                <p className="text-gray-500 my-16 w-full text-center">
                  募集がありません。
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Link
                hidden={!isMyself}
                href={`/profiles/${profileUser.id}/myRecruitsAndRelatedRecruits`}
                target="_blank"
              >
                もっと見る ＞
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}