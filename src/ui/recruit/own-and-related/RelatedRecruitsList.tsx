import { H2Title } from "@/components/Title/H2Title";
import { Recruit } from "@/domein/recruit";
import Link from "next/link";

type Props = {
  relatedRecruits: Recruit[]
};

export const RelatedRecruitsList = ({ relatedRecruits }: Props) => {

  return (
    <div className="flex flex-col space-y-4 w-full mt-16 p-5 rounded-md shadow-md">
      <div className="my-4">
        <H2Title title="自分の作成した募集一覧" />
      </div>
      {relatedRecruits?.length === 0? (
        <p className="text-center font-bold text-red-400">まだ作成していません。</p>
      ) : (
        relatedRecruits?.map((relatedRecruit, index) => {
          return (
            <div key={index} className="flex flex-col sm:flex-row sm:justify-between p-3 sm:p-4 my-3 rounded-md border border-gray-300">
              <div className="flex flex-col items-center sm:flex-row">
                <p className="font-semibold mb-2 sm:mb-0 sm:mr-10">{relatedRecruit.hackathonName}</p>
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