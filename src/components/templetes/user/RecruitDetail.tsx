import { Header } from "@/components/organisms/Header";
import { SuccessOrFailureModal } from "@/components/organisms/SuccessOrFailureModal";
import { UserRecruitApplicationRepository } from "@/modules/user-recruit-application/userRecruitApplication.repository";
import { ConfirmModal } from "@/types/confirmModal";
import { Recruit } from "@/types/recruit";
import { UserRecruitApplicationWithRoomId } from "@/types/userRecruilApplication";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

type Props = {
  recruit: Recruit;
};

export const RecruitDetail: React.FC<Props> = ({ recruit }) => {
  let {
    id,
    createdAt,
    updatedAt,
    headline,
    details,
    programingSkills,
    hackthonName,
    developmentPeriod,
    hackathonUrl,
    numberOfApplicants,
  } = recruit;

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false);

  const onApplyFor = async () => {
    UserRecruitApplicationRepository.applyFor(id)
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
                {hackthonName}
              </h1>
              {/* headline */}
              <p className="text-xl mt-2 text-center">{headline}</p>
            </div>
            {/* プログラミングスキル */}
            <div className="h-1/5 flex justify-center items-center">
              {programingSkills?.map((skill) => {
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
            <div className="h-1/5">
              {/* 募集の詳細 */}
              <p className="mt-5 mx-5 leading-snug border border-white p-1 rounded-md ">
                {details}
              </p>
            </div>
            <div className="flex flex-row justify-between h-1/5">
              <div className="w-1/3">
                <p className="text-sm">・hackthon URL</p>
                <Link href={"/"}>{hackathonUrl}</Link>
              </div>
              <div className="w-1/3">
                <p className="text-sm">・開発期間</p>
                <p>{developmentPeriod}</p>
              </div>
            </div>

            <div className="flex flex-row justify justify-between w-full">
              <div className="ml-5">
                <p className="text-sm">募集人数</p>
                <p>{numberOfApplicants}</p>
              </div>
              <div className="w-1/2 flex justify-end mr-5">
                {/* <Link href={"/"} className="bg-green-300 p-3 rounded-md">話を聞く</Link> */}
                <button
                  onClick={onApplyFor}
                  className="bg-green-300 p-3 rounded-md"
                >
                  話を聞く
                </button>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-row justify-between w-full items-end">
              <div className="w-1/2 ml-5 ">
                <p className="text-sm">募集人数</p>
                <p>{numberOfApplicants}</p>
              </div>
              <div className="w-1/2 flex justify-end mr-5">
                <Link href={"/"} className="bg-green-300 p-3 rounded-md">話を聞く</Link>
              </div>
            </div> */}
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
