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
      const fetchedMyProducts = await recruitRepository.getMyRecruitsbyFirebaseUID()
      setMyRecruits(fetchedMyProducts)
      
      const fetchedRelatedProducts = await recruitRepository.getRelatedRecruitbyUserId()
      setRelatedRecruit(fetchedRelatedProducts)

    })()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-3/5 mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-center mb-5 font-bold text-lg">自分の作成したRecruit一覧</h1>
        {myRecruits?.length === 0 ? (
          <p className="text-center font-bold text-red-400">There are no my recruits.</p>
        ) : (
          myRecruits?.map((myRecruit) => {
            const hasApprovedApplicants = myRecruit.userRecruitParticipant?.some((participant) => participant.isApproved);
            return (
              <div className="flex flex-row justify-between p-4 my-3 rounded-md border border-gray-300">
                <div className="flex flex-row">
                  <p className="font-semibold mr-10">{myRecruit.hackthonName}</p>
                  { hasApprovedApplicants ? (
                    <p className="text-red-400">応募者がいます！</p>
                  ) : (
                    <p>応募者はいません...</p>
                  )
                  }
                </div>
                <div>
                  <Link href={`/recruit/${myRecruit.id}/ownRecruitDetail`} className="text-red-600">
                    詳細へ
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 関連する方 */}
      <div className="w-3/5 mt-10 p-5 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-center mb-5 font-bold text-lg">関連しているRecruit一覧</h1>
        {relatedRecruits?.length === 0? (
          <p className="text-center font-bold text-red-400">There are no related recruits.</p>
        ) : (
          relatedRecruits?.map((relatedRecruit) => {
            return (
              <div className="flex flex-row justify-between p-4 my-3 rounded-md border border-gray-300">
                <div className="flex flex-row">
                  <p className="font-semibold mr-10">{relatedRecruit.hackthonName}</p>
                  <p className="">{relatedRecruit.recruiter?.name}</p>
                </div>
                <div>
                  <Link href={`/recruit/${relatedRecruit.id}/recruitDetail`} className="text-red-500">
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
