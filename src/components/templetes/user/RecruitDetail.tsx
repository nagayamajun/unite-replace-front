import { SuccessOrFailureModal } from "@/components/organisms/SuccessOrFailureModal";
import { UserState } from "@/global-states/atoms";
import { recruitRepository } from "@/modules/recruit/recruit.repository";
import { UserRecruitApplicationRepository } from "@/modules/user-recruit-application/userRecruitApplication.repository";
import { userRecruitParticipantRepository } from "@/modules/user-recruit-participant/userRecruitParticipant.repository";
import { Recruit } from "@/types/recruit";
import { UserRecruitApplicationWithRoomId } from "@/types/userRecruilApplication";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";


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

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col justify-center items-center h-full text-white bg-gray-100">
        <div className="flex flex-col items-center w-9/12 h-3/4 rounded-md bg-gradient-to-r from-green-300 to-pink-300 ">
          <div className="flex flex-col w-full h-full">
            <div className="h-1/4 flex flex-col justify-center items-center">
              {/* ハッカソン名 */}
              <h1 className="text-4xl font-bold mt-5 text-center">
                {recruit?.hackthonName}
              </h1>
              {/* headline */}
              <p className="text-xl mt-2 text-center">{recruit?.headline}</p>
            </div>
            {/* プログラミングスキル */}
            <div className="h-1/5 flex justify-center items-center">
              {recruit?.programingSkills?.map((skill) => {
                return (
                  <div
                    key={skill}
                    className="bg-white text-gray-400 mx-2 p-2 rounded-md"
                  >
                    {skill}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-row justify-between border-b p-3">
              <div>開発期間: <span className="ml-2">{recruit?.developmentPeriod}</span></div>
              <div>募集人数: <span className="ml-2">{recruit?.numberOfApplicants}</span></div>
              <div>開発人数: <span className="ml-2">{recruit?.numberOfApplicants}</span></div>
            </div>

            <div className="border-b">
              {/* 募集の詳細 */}
              <p className="mt-5 mx-5 leading-snug border border-white p-1 rounded-md ">
                {recruit?.details}
              </p>
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
              <button onClick={onApplyFor} className="bg-green-500 text-white px-6 py-2 rounded-sm">話を聞く</button>
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

      <SuccessOrFailureModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalMessage={modalMessage}
        modalBgColor={color!}
      />
    </div>
  );
};
