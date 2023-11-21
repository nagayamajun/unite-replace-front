import { H2Title } from "@/components/Title/H2Title";
import { Recruit } from "@/domein/recruit";
import Link from "next/link";

type Props = {
  myRecruits: Recruit[]
}

export const MyRecruitsList = ({ myRecruits }: Props): JSX.Element => {

  return (
    <div className="flex flex-col space-y-4 w-full mt-16 p-5 rounded-md shadow-md">
      <div className="my-4">
        <H2Title title="自分の作成した募集一覧" />
      </div>
      {!myRecruits?.length ? (
        <p className="text-center font-bold text-red-400">まだ作成していません。</p>
      ) : (
        myRecruits?.map((myRecruit) => {
          const hasApprovedApplicants = myRecruit.userRecruitParticipant?.some(participant => participant.isApproved === false);
          return (
            <div key={myRecruit.id} className="flex flex-col sm:flex-row sm:justify-between p-3 sm:p-4 rounded-md border border-gray-300">
              <div className="flex flex-col items-center sm:flex-row">
                <p className="font-semibold mb-2 sm:mb-0 sm:mr-10">{myRecruit.hackathonName}</p>
                { hasApprovedApplicants ? (
                  <p className="text-red-400 mb-2 sm:mb-0 text-sm sm:text-base">応募者がいます！</p>
                ) : (
                  <p className="text-sm mb-2 sm:mb-0 sm:text-base">応募者はいません...</p>
                )
                }
              </div>
              <div className="flex justify-end">
                <Link href={`/recruit/${myRecruit.id}/ownRecruitDetail`} className="flex text-red-600 text-sm sm:text-base">
                  詳細へ
                </Link>
              </div>
            </div>
          );
        })
      )}
    </div>
  )
}