import { SuccessOrFailureModal } from "@/components/organisms/Modal/SuccessOrFailureModal";
import { useUserRecruitApplicationByApplicantIdAndRecruitId } from "@/features/recruit/hooks/useUserRecruitApplicationByApplicantIdAndRecruitId";
import { UserRecruitApplicationRepository } from "@/features/recruit/modules/user-recruit-application/userRecruitApplication.repository";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  recruitId: string
}

export const JumpToMessageButton = ({ recruitId }: Props): JSX.Element => {
  const router = useRouter();

  const { application: applicationFromMyself } =
  useUserRecruitApplicationByApplicantIdAndRecruitId(recruitId);

  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>(false);
  const closeModal = () => setIsOpen(false);

  //話を聞く
  const onApplyFor = async () => {
    UserRecruitApplicationRepository.applyFor(recruitId)
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
        }, 4000);
      });
  };

  return (
    <>
      {!applicationFromMyself && (
        <button
          onClick={onApplyFor}
          className="ml-5 bg-green-500 text-white px-6 py-2 rounded"
        >
          話を聞く
        </button>
      )}
      <SuccessOrFailureModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalMessage={modalMessage}
        modalBgColor={color!}
      />
    </>
  )
}