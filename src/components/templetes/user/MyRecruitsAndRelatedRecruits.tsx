import { UserState } from "@/global-states/atoms"
import { recruitRepository } from "@/modules/recruit/recruit.repository"
import { Recruit } from "@/types/recruit"
import Link from "next/link"
import { useEffect, useState } from "react"


export const MyRecruitsAndRelatedRecruits = () => {

  const [ myRecruits, setMyRecruits ] =  useState<Recruit[]>();
  const [ relatedRecruits, setRelatedRecruit ] = useState<Recruit[]>();

  useEffect(() => {
    (async () => {
      await Promise.all([
        recruitRepository.getMyRecruitsbyFirebaseUID().then((res) => {
          setMyRecruits(res)
        }),
        recruitRepository.getRelatedRecruitbyUserId().then((res) => {
          setRelatedRecruit(res)
        })
      ])
    })()
  }, [])

  return (
    <div className="flex flex-col items-center justify-start h-screen space-y-10">
      {/* 自分で作成した募集 */}
      <div className="w-80 sm:w-sm mt-10 sm:mt-20 p-5 bg-gray-100 sm:bg-white rounded-lg shadow-md">
        <h1 className="text-center mb-5 font-bold text-lg">自分の作成した募集一覧</h1>
        {myRecruits?.length === 0 ? (
          <p className="text-center font-bold text-red-400">There are no my recruits.</p>
        ) : (
          myRecruits?.map((myRecruit) => {
            const hasApprovedApplicants = myRecruit.userRecruitParticipant?.some(participant => participant.isApproved === false);
            return (
              <div className="flex flex-col sm:flex-row sm:justify-between p-3 sm:p-4 my-3 rounded-md border border-gray-300">
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

      {/* 自分に関連する募集 */}
      <div className="w-80 sm:w-sm mt-10 sm:mt-20 p-5 bg-gray-100 sm:bg-white rounded-lg shadow-md">
        <h1 className="text-center mb-5 font-bold text-lg">参加する/参加した募集一覧</h1>
        {relatedRecruits?.length === 0? (
          <p className="text-center font-bold text-red-400">There are no related recruits.</p>
        ) : (
          relatedRecruits?.map((relatedRecruit) => {
            return (
              <div className="flex flex-col sm:flex-row sm:justify-between p-3 sm:p-4 my-3 rounded-md border border-gray-300">
                <div className="flex flex-col items-center sm:flex-row">
                  <p className="font-semibold mb-2 sm:mb-0 sm:mr-10">{relatedRecruit.hackthonName}</p>
                  <p className="text-sm mb-2 sm:mb-0 sm:text-base">募集主: {relatedRecruit.recruiter?.name}</p>
                </div>
                <div  className="flex justify-end">
                  <Link href={`/recruit/${relatedRecruit.id}/recruitDetail`} className="flex text-red-600 text-sm sm:text-base">
                    詳細へ
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex justify-center items-center mt-10 w-1/2">
        <Link href="/homeScreen" className="rounded-md px-16 py-3 bg-green-500 hover:bg-green-600 text-white">戻る</Link>
      </div>
    </div>
  )
}
