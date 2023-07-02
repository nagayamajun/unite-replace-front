import { Recruit } from "@/types/recruit";
import Link from "next/link";
import { format } from 'date-fns'
import React, { useEffect, useState } from "react";
import { userRecruitParticipantRepository } from "@/modules/user-recruit-participant/userRecruitParticipant.repository";
import { useRouter } from "next/router";
import { recruitRepository } from "@/modules/recruit/recruit.repository";
import { UserRecruitParticipant } from "@/types/UserRecruitParticipant";



export const OwnRecruitDetail: React.FC = ()  => {
  const router = useRouter();
  const { id } = router.query

  const [ recruit, setRecruit ] = useState<Recruit>()
  
  useEffect(() =>{
    (async () => {
      const fetchedRecruit = await recruitRepository.getRecruitById(id as string);
      setRecruit(fetchedRecruit);
    })()
  },[])

  const handleUploadProduct = () => {
    router.push(`/product/uploadProduct?recruitId=${recruit?.id}`);
  };

  const approveApplication = async(uid: string) => {
    await userRecruitParticipantRepository.approveParticipant(uid);
    router.reload();
  }

  const rejectApplication = async(uid: string) => {
    await userRecruitParticipantRepository.rejectParticipant(uid);
    router.reload();
  }

  return (
    <div className="h-full flex justify-center items-center sm:bg-gray-100">
      <div className="flex flex-col items-center w-4/5 sm:w-base md:w-sm  bg-white rounded-sm">
        <div className="h-20 sm:h-40 w-full flex flex-col justify-center items-center bg-gradient-to-r from-green-300 to-pink-300 text-white rounded-sm rounded-b-none">
          {/* ハッカソン名 */}
          <h1 className="text-3xl sm:text-4xl font-bold text-center">{recruit?.hackthonName}</h1>
        </div>

        <div className="w-full sm:w-4/5 flex flex-col">
          <div className="flex items-center justify-center h-20 sm:h-24 border-b border-gray-200 text-lg">
            {recruit?.headline}
          </div>
          {/* プログラミングスキル */}
          <div className="flex flex-col justify-start items-start border-b pl-5 m-2 sm:pl-0 pb-5">
            <p className="my-2 font-semibold">募集スキル</p>
            <div className="break-all flex-row flex flex-wrap">
              {recruit?.programingSkills?.map(skill => (
                  <p className="bg-gray-50 border rounded-2xl m-1 px-3 overflow-hidden text-overflow-ellipsis">{skill}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between border-b pl-5 sm:pl-0 m-2 pb-5">
            <div className="mb-2 w-full">
              <p className="font-semibold">開発期間</p>
              <div>{recruit?.developmentPeriod}</div>
            </div>
            <div className="w-full">
              <p className="font-semibold">募集人数</p>
              <div><span className="bg-green-400 p-1 rounded-md text-white">{recruit?.numberOfApplicants}</span> 人</div>
            </div>
          </div>

          <div className="border-b pl-5 sm:pl-0 m-2 pb-5">
            {/* 募集の詳細 */}
            <p className="font-semibold mb-2">詳細</p>
            <div className="leading-snug border border-gray-200 rounded p-3">{recruit?.details}</div>
          </div>

          <div className="border-b pl-5 sm:pl-0 m-2 pb-5">
            <p className="font-semibold mb-2">ハッカソンURL</p>
            <div className="leading-snug border border-gray-200 rounded p-2">{recruit?.hackathonUrl}</div>
          </div>

          <div></div>

          {/* <div className="flex flex-col w-full"> */}
          <div className="border-b pl-5 sm:pl-0 m-2 pb-5">
            <p className="font-semibold mb-2">参加者</p>
            {recruit?.userRecruitParticipant?.length === 0 && <p>参加者はまだいません</p>}
            {recruit?.userRecruitParticipant?.map((participant: UserRecruitParticipant) => {
              if (participant.isApproved) {
                return (
                  <div>
                    {/* userの写真追加する */}
                    <p>{participant.user.name}</p>
                  </div>
                )
              }
            })}
          </div>

          <div className="border-b pl-5 sm:pl-0 m-2 pb-5">
            <p className="font-semibold mb-2">参加希望者一覧</p>
            {/* ここは応募してくれた方を一覧表示する */}
            {recruit?.userRecruitParticipant?.length === 0 && <p>希望者はまだいません</p>}
            {recruit?.userRecruitParticipant?.map((participant: UserRecruitParticipant) => {
              if (!participant.isApproved) {
                return (
                  <div className="flex flex-row justify-between">
                    <p>{participant.user?.name}</p>
                    <div>
                      <button onClick={() => {approveApplication(participant.id)}} className="mr-2 hover:text-green-400">承認</button>
                      <button onClick={() => {rejectApplication(participant.id)}} className="hover:text-red-400">拒否</button>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>

        <div className="flex flex-row items-center justify-center w-full my-10">
          {
            recruit?.product.length !== 0 ? (
              <Link href={`/product/${recruit?.product[0]?.id}`} className="bg-green-400 hover:bg-green-500 px-6 py-4 rounded-md text-white font-semibold">Productページへ</Link>
            ) : (
              <div className="w-1/3 flex justify-center items-center">
                <button onClick={handleUploadProduct} className="bg-green-400 px-12 py-2 rounded-md text-white">UPLOAD</button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

 //まだできていないこと
 //募集人数を動的に変更

 //src/pages/product/[recruitId]/uploadProduct.tsx
