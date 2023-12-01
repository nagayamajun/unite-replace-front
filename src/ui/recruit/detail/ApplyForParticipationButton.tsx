import { PlainButton } from "@/components/Button/PlainButton";

type Props = {
  isParticipant: boolean | undefined;
  handleApplyForJoin: () => Promise<void>;
}

export const ApplyForParticipationButton = ({ isParticipant, handleApplyForJoin }: Props):JSX.Element => {
  return (
    <>
      <PlainButton
        disabled={isParticipant}
        type="button"
        innerText="参加を申請する"
        onClick={handleApplyForJoin}
      />
    </>
  )
}