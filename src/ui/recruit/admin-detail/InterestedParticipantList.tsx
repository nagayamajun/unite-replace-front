import { PlainButton } from "@/components/Button/PlainButton";
import { PersonIcon } from "@/components/molecules/Icon/PersonIcon";
import { UserRecruitParticipant } from "@/domein/recruitParticipant";

type Props = {
  interestedParticipants: UserRecruitParticipant[] | undefined;
  handleApproveParticipant: (id: string) => Promise<void>;
  handleRejectParticipant: (id: string) => Promise<void>;
}

export const InterestedParticipantList = ({ interestedParticipants, handleApproveParticipant, handleRejectParticipant }: Props): JSX.Element => {
  return (
    <div className="w-full bg-plain-gray p-6 rounded-md min-h-[160px]">
      <h3 className="mb-4">申請ユーザー</h3>
      <div className="flex flex-col space-y-4" >
        { interestedParticipants?.length ? (  
            interestedParticipants.map((participant) => (
              <div key={participant.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-8 text-lg">
                  <PersonIcon
                    defaultIconSize={56}
                    originalIconImageSrc={participant.user.imageUrl}
                  />
                  <p>{participant.user.name}</p>
                </div>
                <div className="flex space-x-4 ">
                  <div className="w-20 h-10">
                    <PlainButton
                      innerText="承認"
                      type="button"
                      onClick={() => handleApproveParticipant(participant.id)}
                    />
                  </div>
                  <div className="w-20 h-auto">
                    <PlainButton
                      innerText="拒否"
                      buttonColor="red"
                      type="button"
                      onClick={() => handleRejectParticipant(participant.id)}
                    />
                  </div>
                </div>
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