import { useMyRecruits } from "@/features/recruit/hooks/useMyRecruits"
import Link from "next/link";


export const MyRecruitsList = (): JSX.Element => {
  const { myRecruits } = useMyRecruits();

  return (
    <div className="w-80 sm:w-sm md:w-md mt-10 sm:mt-20 p-5 bg-gray-100 sm:bg-white rounded-lg shadow-md">
      <h1 className="text-center mb-5 font-bold text-lg">自分の作成した募集一覧</h1>
      {!myRecruits?.length ? (
        <p className="text-center font-bold text-red-400">まだ作成していません。</p>
      ) : (
        myRecruits?.map((myRecruit, index) => {
          const hasApprovedApplicants = myRecruit.userRecruitParticipant?.some(participant => participant.isApproved === false);
          return (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between p-3 sm:p-4 my-3 rounded-md border border-gray-300">
              <div className="flex flex-col items-center sm:flex-row">
                <p className="font-semibold mb-2 sm:mb-0 sm:mr-10">{myRecruit.hackthonName}</p>
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