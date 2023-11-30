import { PersonIcon } from "@/components/molecules/Icon/PersonIcon"
import { UserRecruitParticipant } from "@/domein/recruitParticipant";

type Props = {
  approvedParticipants: UserRecruitParticipant[] | undefined;
}

export const ApprovedParticipantsList = ({ approvedParticipants }: Props): JSX.Element => {
  return (
    <div className="w-full bg-plain-gray p-6 rounded-md min-h-[160px]">
      <h3 className="mb-4">参加確定ユーザー</h3>
      <div className="flex flex-col space-y-4">
        { approvedParticipants?.length ? (  
            approvedParticipants.map((participant) => (
              <div key={participant.id} className="flex items-center space-x-8 text-lg">
                <PersonIcon
                  defaultIconSize={56}
                  originalIconImageSrc={participant.user.imageUrl}
                />
                <p>{participant.user.name}</p>
                <p>{participant.user.githubAccount}</p>
              </div>
            ))
          ) : (
            <strong className="m-auto text-red-500">参加確定者はまだ存在しません。</strong>
          )
        }
      </div>
    </div>
  )
}