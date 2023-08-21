import { SuccessOrFailureModal } from "@/components/organisms/Modal/SuccessOrFailureModal";
import { userRecruitParticipantRepository } from "@/features/recruit/modules/user-recruit-participant/userRecruitParticipant.repository";
import { UserRecruitParticipant } from "@/features/recruit/types/UserRecruitParticipant"
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  participants: UserRecruitParticipant[]
}

export const ProspectiveParticipantList = ({ participants }: Props): JSX.Element => {
  const router = useRouter();
  const prospectiveParticipants = participants.filter(participant => !participant.isApproved);

  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false);

  // 参加者を承認する
  const approveApplication = async(id: string) => {
    await userRecruitParticipantRepository.approveParticipant(id)
    .then((result) => {
      if (result) {
        setIsOpen(true);
        setModalMessage(result.message)
        setColor(result.success)

        setTimeout(() => {
          router.reload()
        },
        result.success ? 2000 : 4000
        )
      }
    });
  }

  // 参加者を拒否する
  const rejectApplication = async(uid: string) => {
    await userRecruitParticipantRepository.rejectParticipant(uid)
    .then((result) => {
      if (result) {
        setIsOpen(true);
        setModalMessage(result.message)
        setColor(result.success)

        setTimeout(() => {
          router.reload()
        },
        result.success ? 2000 : 4000
        )
      }
    });
  }

  return (
    <div className="border-b pl-5 sm:pl-0 m-2 pb-5">
      <p className="font-semibold mb-2">参加希望者一覧</p>
      {/* ここは応募してくれた方を一覧表示する */}
      {prospectiveParticipants?.length === 0 ? (
        <p>希望希望者はまだいません</p> 
      ) : (
        prospectiveParticipants.map((participant) => (
          <div key={participant.id} className="flex flex-row justify-between">
            <p>{participant.user?.name}</p>
            <div>
              <button onClick={() => {approveApplication(participant.id)}} className="mr-2 hover:text-green-400">承認</button>
              <button onClick={() => {rejectApplication(participant.id)}} className="hover:text-red-400">拒否</button>
            </div>
          </div>
        ))
      )}
      <SuccessOrFailureModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalMessage={modalMessage}
        modalBgColor={color!}
      />
    </div>
  )
}