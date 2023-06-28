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

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col justify-center items-center h-full text-gray-600 bg-gray-200">
        <div className="flex flex-col items-center w-3/5 h-3/4 rounded-xl bg-white">
          <div className="h-1/5 w-full flex flex-col justify-center items-center bg-gradient-to-r from-green-300 to-pink-300 text-white rounded-xl rounded-b-none">
            {/* ハッカソン名 */}
            <h1 className="text-3xl font-bold text-center">{recruit?.hackthonName}</h1>
          </div>

          <div className="h-1/2  w-3/4 flex flex-col">
            <div className="border-b border-gray-200 text-center text-lg p-2">
              {recruit?.headline}
            </div>
            {/* プログラミングスキル */}
            <div className="h-1/5 flex justify-start items-center border-b m-1">
            スキル:{recruit?.programingSkills?.map(skill => {
              return (
                <div key={skill} className="border rounded-2xl m-1 px-3">{skill}</div>
              )
              })}
            </div>

            <div className="flex flex-row justify-between border-b p-1">
              <div>開発期間: <span className="ml-2">{recruit?.developmentPeriod}</span></div>
              <div>募集人数: <span className="ml-2">{recruit?.numberOfApplicants}</span></div>
              <div>開発人数: <span className="ml-2">{recruit?.numberOfApplicants}</span></div>
            </div>

            <div className="border-b">
              {/* 募集の詳細 */}
              <p className="leading-snug border border-white p-2 ">{recruit?.details}</p>
            </div>

            <div className="p-1 border-b">
              ハッカソンのurl: <span>{recruit?.hackathonUrl}</span>
            </div>

            <div className="flex flex-col w-full">
              参加者:
              {recruit?.userRecruitParticipant?.length === 0 && <p>参加者はまだいません</p>}
              {recruit?.userRecruitParticipant?.map((participant: UserRecruitParticipant) => {
                if (participant.isApproved) {
                  return (
                    <div>
                      <p>{participant.user.name}</p>
                    </div>
                  )
                }
              })}
            </div>
          </div>


          <div className="mt-10 w-3/4 flex flex-col">
            <p className="mb-2">参加希望者一覧</p>
            {/* ここは応募してくれた方を一覧表示する */}
            {recruit?.userRecruitParticipant?.length === 0 && <p>希望者はまだいません</p>}
             {recruit?.userRecruitParticipant?.map((participant: UserRecruitParticipant) => {
              if (!participant.isApproved) {
                return (
                  <div className="flex flex-row justify-between">
                    <p>{participant.user?.name}</p>
                    <div>
                      <button onClick={() =>  {approveApplication(participant.id)}} className="mr-2 hover:text-green-400">承認</button>
                      <button className="hover:text-red-400">拒否</button>
                    </div>
                  </div>
                )
              }
             })}
          </div>

          <div className="flex flex-row items-center justify-between w-full mt-10">
            <div className="w-1/3 ml-2">
              {recruit?.createdAt && format(new Date(recruit.createdAt), 'yyyy-MM-dd')}
            </div>
            {
              recruit?.product.length !== 0 ? (
                <Link href={`/product/${recruit?.product[0]?.id}`} >Productページへ</Link>
              ) : (
                <div className="w-1/3 flex justify-center items-center">
                  <button onClick={handleUploadProduct} className="bg-green-400 px-12 py-2 rounded-md text-white">UPLOAD</button>
                </div>
              )
            }
            <div className="w-1/3 flex justify-end mr-5">
              <Link href={"/homeScreen"} className="bg-green-400 px-12 py-2 rounded-md text-white">戻る</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

 //まだできていないこと
 //募集人数を動的に変更

 //src/pages/product/[recruitId]/uploadProduct.tsx
