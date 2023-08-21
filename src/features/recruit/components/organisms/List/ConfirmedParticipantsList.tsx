import { PersonIcon } from "@/components/molecules/Icon/PersonIcon"
import { UserRecruitParticipant } from "@/features/recruit/types/UserRecruitParticipant"

type Props = {
  participants: UserRecruitParticipant[]
}

export const ConfirmedParticipantsList = ({ participants }: Props): JSX.Element => {
  const confirmedParticipants = participants.filter(participant => participant.isApproved);
  return (
    <div className="border-b pl-5 sm:pl-0 m-2 pb-5">
      <p className="font-semibold mb-2">参加者</p>
      {confirmedParticipants?.length === 0 ? (
        <p>参加確定者はまだいません</p>
      ) : (
        confirmedParticipants.map((participant) => (
            <div key={participant.id} className="flex flex-row items-center gap-10">
              {/* userの写真追加する */}
              <PersonIcon 
                originalIconImageSrc={participant.user.imageUrl}
                originalIconImageAlt="参加確定者アイコン"
              />
              <p>{participant.user.name}</p>
            </div>
          ))
      )}
    </div>
  )
}