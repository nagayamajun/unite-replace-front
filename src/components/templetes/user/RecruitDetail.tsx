import { UserState } from "@/global-states/atoms";
import { recruitRepository } from "@/modules/recruit/recruit.repository";
import { userRecruitParticipantRepository } from "@/modules/user-recruit-participant/userRecruitParticipant.repository";
import { Recruit } from "@/types/recruit";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";


export const RecruitDetail: React.FC = ()  => {
  const router = useRouter()
  const { id } = router.query;
  const user = useRecoilValue(UserState);

  const [ recruit , setRecruit ] = useState<Recruit>();
  const isParticipant = recruit?.userRecruitParticipant?.some(participant => participant.userId == user?.id);

  useEffect(() => {
    ( async () => {
      const fetchedRecruit = await recruitRepository.getRecruitById(id as string);
      setRecruit(fetchedRecruit);
    })()
  }, [])

  console.log(recruit)

  const applyForJoin = async() => {
    console.log(id)
    await userRecruitParticipantRepository.applyForJoin(recruit?.id as string);
    router.reload()
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col justify-center items-center h-full text-gray-600 bg-gray-200">
        <div className="flex flex-col items-center w-3/5 h-3/4 rounded-xl bg-white">
          <div className="h-1/5 w-full flex flex-col justify-center items-center bg-gradient-to-r from-green-300 to-pink-300 text-white rounded-xl rounded-b-none">
            {/* ハッカソン名 */}
            <h1 className="text-3xl font-bold text-center">{recruit?.hackthonName}</h1>
          </div>

          <div className="h-3/5  w-3/4 flex flex-col">
            <div className="border-b border-gray-200 text-center text-lg p-4">
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

            <div className="flex flex-row justify-between border-b p-3">
              <div>開発期間: <span className="ml-2">{recruit?.developmentPeriod}</span></div>
              <div>募集人数: <span className="ml-2">{recruit?.numberOfApplicants}</span></div>
              <div>開発人数: <span className="ml-2">{recruit?.numberOfApplicants}</span></div>
            </div>

            <div className="border-b">
              {/* 募集の詳細 */}
              <p className="leading-snug border border-white p-3 ">{recruit?.details}</p>
            </div>

            <div className="p-1 border-b">
              ハッカソンのurl: <span className="ml-5">{recruit?.hackathonUrl}</span>
            </div>

            <div className="p-2">
              募集主: <span className="ml-5">{recruit?.recruiter?.name}</span>
            </div>
          </div>

          <div className="w-full border-t"></div>

          <div className="flex flex-row justify-between w-2/5 mt-5">
              <button className="bg-green-500 text-white px-6 py-2 rounded-sm">話を聞く</button>
              {isParticipant ? null : (
                <button onClick={applyForJoin} className="bg-green-500 text-white px-6 py-2 rounded-sm">
                  参加依頼
                </button>
              )}
          </div>

          <div className="flex flex-row items-center justify-between w-full mt-10">
            <div className="ml-5">
              {recruit && format(new Date(recruit?.createdAt), 'yyyy-MM-dd')}
            </div>
            <div className="w-1/2 flex justify-end mr-5">
              <Link href={"/"} className="bg-green-400 px-12 py-2 rounded-md text-white">戻る</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

