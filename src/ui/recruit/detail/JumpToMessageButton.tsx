import { PlainButton } from "@/components/Button/PlainButton";
import { RecruitApplication } from "@/domein/recruitApplication";

type Props = {
  application: RecruitApplication | undefined;
  handleOnApplyFor: () => Promise<void>
}

export const JumpToMessageButton = ({ application, handleOnApplyFor }: Props): JSX.Element => {
  return (
    <>
      {/* TODO: roomがある場合はroomに飛べるようにする */}
      <PlainButton
        disabled={!application ? false : true}
        type="button"
        innerText="話を聞く"
        onClick={handleOnApplyFor}
      />
    </>
  )
}