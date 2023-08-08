import { Loading } from "@/components/organisms/Loading/Loading";
import { useRelatedRecruits } from "@/features/recruit/hooks/useRelatedRecruits"
import Link from "next/link";

export const RelatedRecruitsList = () => {
  const { relatedRecruits } = useRelatedRecruits();
  if (relatedRecruits === undefined) <Loading />

  return (
    <div className="w-80 sm:w-sm md:w-md mt-10 sm:mt-20 p-5 sm:bg-white rounded-lg shadow-md">
      <h1 className="text-center mb-5 font-bold text-lg">参加する/参加した募集一覧</h1>
      {relatedRecruits?.length === 0? (
        <p className="text-center font-bold text-red-400">まだ作成していません。</p>
      ) : (
        relatedRecruits?.map((relatedRecruit, index) => {
          return (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between p-3 sm:p-4 my-3 rounded-md border border-gray-300">
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
  )
}