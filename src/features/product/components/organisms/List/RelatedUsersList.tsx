import { UserRecruitParticipant } from "@/features/recruit/types/UserRecruitParticipant"
import { UserCard } from "@/features/user/components/organisms/Card/UserCard"

type Props = {
  participantsInfo: UserRecruitParticipant[]
}

export const RelatedUsersList = ({ participantsInfo }: Props): JSX.Element => (
  <div className="w-full flex gap-4 flex-wrap">
    {participantsInfo.map((participant) => (
      <div key={participant.id}>
        {/* <UserCard user={participant.user} /> */}
      </div>
    ))}
  </div>
)