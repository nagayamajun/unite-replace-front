import { UserState } from "@/stores/atoms";
import { UserRecruitApplicationRepository } from "@/features/recruit/modules/user-recruit-application/userRecruitApplication.repository";
import { userRecruitParticipantRepository } from "@/features/recruit/modules/user-recruit-participant/userRecruitParticipant.repository";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Loading } from "../../../../components/organisms/Loading/Loading";
import { RecruitLikeButton } from "@/features/recruit/components/molecules/Button/RecruitLikeButton";
import { useRecruit } from "../../hooks/useRecruit";
import { SelectedSkillsList } from "@/components/molecules/SkillList/SelectedSkillsList";
import { useUserRecruitApplicationByApplicantIdAndRecruitId } from "../../hooks/useUserRecruitApplicationByApplicantIdAndRecruitId";

export const RecruitDetail: React.FC = () => {
  const router = useRouter();

  const user = useRecoilValue(UserState);
  const { recruit } = useRecruit();
  //いいねをしているかしていないかの判定に利用する
  const isLiked = recruit?.userToRecruitLikes?.some(
    (like) => like.userId === user?.id
  );

  const [isParticipant, setIsParticipant] = useState<boolean>();

  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();

  useEffect(() => {
    const checkParticipant = recruit?.userRecruitParticipant?.some(
      (participant) => participant.userId === user?.id
    );
    setIsParticipant(checkParticipant);
  }, [recruit]);

  const { application: applicationFromMyself } =
    useUserRecruitApplicationByApplicantIdAndRecruitId(recruit?.id);

  const applyForJoin = async () => {
    await userRecruitParticipantRepository.applyForJoin(recruit?.id as string);
    setIsParticipant(true);
  };

  const onApplyFor = async () => {
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

  if (isLiked === undefined || isParticipant === undefined) return <Loading />;
  if (!recruit) return <></>;

  return (
    <div className="h-full min-h-screen w-full flex justify-center items-center text-gray-600">
      <div className="flex flex-col items-center w-4/5 sm:w-sm md:w-md  lg:w-lg bg-white rounded-md">
        <div className="h-24 sm:h-40 w-full flex flex-col justify-center items-center bg-gradient-to-r from-green-300 to-pink-300 text-white rounded-md gap-y-4">
          {/* ハッカソン名 */}
          <p className="text-3xl sm:text-4xl font-bold text-center">
            {recruit?.hackthonName}
          </p>
          <p className="text-xl text-center">{recruit?.headline}</p>
        </div>

        <div className="w-full  flex flex-col gap-y-10">
          {/* プログラミングスキル */}
          <div className="border border-gray-300 p-2 mx-2 mt-10 rounded-lg">
            <SelectedSkillsList
              selectedSkillsDescription="募集スキル"
              selectedSkills={recruit?.programingSkills}
              descriptionFontSize="text-base font-semibold"
              skillIconHSize={40}
              skillIconWSize={40}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between border border-gray-300 rounded-lg px-2 py-4 mx-2">
            <div className="mb-2 w-full ">
              <p className="font-semibold">開発期間</p>
              <div>{recruit?.developmentPeriod}</div>
            </div>
            <div className="w-full">
              <p className="font-semibold">募集人数</p>
              <div>
                <span className="p-1 rounded-md font-semibold">
                  {recruit?.numberOfApplicants}
                </span>{" "}
                人
              </div>
            </div>
          </div>

          {/* 募集の詳細 */}
          <div className="m-2">
            <p className="font-semibold mb-2">詳細</p>
            <div
              className="leading-snug border border-gray-300 rounded-lg p-3"
              style={{ overflowWrap: "break-word" }}
            >
              {recruit?.details}
            </div>
          </div>

          <div className="m-2">
            <p className="font-semibold mb-2">ハッカソンURL</p>
            <div
              className="leading-snug border border-gray-300 rounded-lg p-3"
              style={{ overflowWrap: "break-word" }}
            >
              {recruit?.hackathonUrl}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row  justify-between mt-5 p-2">
            <div className="flex items-center w-full sm:w-1/2 mb-5 sm:mb-0">
              {isParticipant ? (
                <p className="text-red-500">*参加を申請しました</p>
              ) : (
                <button
                  onClick={applyForJoin}
                  className="bg-green-500 text-white px-6 py-2 rounded"
                >
                  参加を申請する
                </button>
              )}
            </div>
            <div className="flex flex-row justify-between sm:justify-end items-center w-full sm:w-1/2">
              <RecruitLikeButton
                recruitId={recruit?.id as string}
                isPropsLiked={isLiked}
              />
              {!applicationFromMyself && (
                <button
                  onClick={onApplyFor}
                  className="ml-5 bg-green-500 text-white px-6 py-2 rounded"
                >
                  話を聞く
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
