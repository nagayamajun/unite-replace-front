import { userRecruitParticipantRepository } from "@/features/recruit/modules/user-recruit-participant/userRecruitParticipant.repository";
import { UserRecruitParticipant } from "@/features/recruit/types/UserRecruitParticipant"
import { useToast } from "@/hooks/useToast";
import { ToastResult } from "@/types/toast";
import { useRouter } from "next/router";

type Props = {
  participants: UserRecruitParticipant[]
}

export const ProspectiveParticipantList = ({ participants }: Props): JSX.Element => {
  const router = useRouter();
  const { showToast, hideToast } = useToast();
  const prospectiveParticipants = participants.filter(participant => !participant.isApproved);

  // 参加者を承認する
  const approveApplication = async( id: string ) => {
    await userRecruitParticipantRepository.approveParticipant( id )
    .then(({ message, style }: ToastResult) => {
      showToast({message, style});
      
      setTimeout(() => {
        hideToast();
        router.reload()
      },
      style === 'success' ? 2000 : 4000
      )
    });
  };

  // 参加者を拒否する
  const rejectApplication = async(id: string) => {
    await userRecruitParticipantRepository.rejectParticipant(id)
    .then(({ message, style }: ToastResult) => {
      showToast({ message, style });

      setTimeout(() => {
        hideToast();
        router.reload();
      },
      style === 'success' ? 2000 : 4000
      )
      
    });
  };

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
    </div>
  )
}