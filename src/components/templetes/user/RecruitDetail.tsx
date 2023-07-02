import { LikeButton } from "@/components/atoms/LikeButton";
import { SuccessOrFailureModal } from "@/components/organisms/SuccessOrFailureModal";
import { UserState } from "@/global-states/atoms";
import { recruitRepository } from "@/modules/recruit/recruit.repository";
import { UserRecruitApplicationRepository } from "@/modules/user-recruit-application/userRecruitApplication.repository";
import { userRecruitParticipantRepository } from "@/modules/user-recruit-participant/userRecruitParticipant.repository";
import { Recruit } from "@/types/recruit";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Loading } from "../common/Loading";


export const RecruitDetail: React.FC = () => {

  const user = useRecoilValue(UserState);
  const router = useRouter();
  const { id } = router.query;
  const [ recruit, setRecruit ] = useState<Recruit>();

  useEffect(() => {
    (async () => {
      const fetchedRecruit = await recruitRepository.getRecruitById(id as string)
      setRecruit(fetchedRecruit)
    })()
  }, [])

  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false);
  const isParticipant = recruit?.userRecruitParticipant?.some(participant => participant.userId == user?.id);
  //いいねをしているかしていないかの判定に利用する
  const isLiked = recruit?.userToRecruitLikes?.some((like) => like.userId === user?.id);

  const applyForJoin = async() => {
    await userRecruitParticipantRepository.applyForJoin(recruit?.id as string);
    router.reload()
  }

  const onApplyFor = async () => {
    if (!recruit?.id) throw new Error('recruitIdが確認できません')

    UserRecruitApplicationRepository.applyFor(recruit?.id!)
      .then((applicationWithRoomId) => {
        router.push(`/chat/${applicationWithRoomId.roomId}`);
      })
      .catch((error) => {
        setIsOpen(true);
        setModalMessage(error.message);
        setColor(error.success);

        setTimeout(() => {
          setIsOpen(false);
          router.reload();
        }, 2000);
      });
  };

  if (isLiked === undefined) return <Loading/>

  return (
    <div className="h-full flex justify-center items-center sm:bg-gray-100 pb-[200px] text-gray-600">
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
              {recruit?.programingSkills?.map((skill, index) => (
                  <p key={index} className="bg-gray-50 border rounded-2xl m-1 px-3 overflow-hidden text-overflow-ellipsis">{skill}</p>
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

          <div className="border-b pl-5 sm:pl-0 m-2 pb-7">
            {/* 募集の詳細 */}
            <p className="font-semibold mb-2">詳細</p>
            <div className="leading-snug border border-gray-200 rounded p-3">{recruit?.details}</div>
          </div>

          <div className="border-b pl-5 sm:pl-0 m-2 pb-5">
            <p className="font-semibold mb-2">ハッカソンURL</p>
            <div className="leading-snug border border-gray-200 rounded p-2">{recruit?.hackathonUrl}</div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between mt-5">
            <div className="flex items-center w-full sm:w-1/2 mb-5 sm:mb-0">
              {isParticipant ? <p className="text-red-500">*参加を申請しました</p> : (
                <button onClick={applyForJoin} className="bg-green-500 text-white px-6 py-2 rounded-sm">
                  参加を申請する
                </button>
              )}
            </div>
            <div className="flex flex-row justify-between sm:justify-end items-center w-full sm:w-1/2">
              <LikeButton 
                recruitId={recruit?.id as string} 
                isPropsLiked={isLiked} 
              />
              <button onClick={onApplyFor} className="ml-5 bg-green-500 text-white px-6 py-2 rounded-sm">話を聞く</button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
};
