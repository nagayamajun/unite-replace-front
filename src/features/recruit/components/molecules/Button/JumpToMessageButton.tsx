import { useUserRecruitApplicationByApplicantIdAndRecruitId } from "@/features/recruit/hooks/useUserRecruitApplicationByApplicantIdAndRecruitId";
import { UserRecruitApplicationRepository } from "@/features/recruit/modules/user-recruit-application/userRecruitApplication.repository";
import { useToast } from "@/hooks/useToast";
import { ToastResult } from "@/types/toast";
import { useRouter } from "next/router";

type Props = {
  recruitId: string
}

export const JumpToMessageButton = ({ recruitId }: Props): JSX.Element => {
  const router = useRouter();
  const { showToast, hideToast } = useToast();
  const { application: applicationFromMyself } =
  useUserRecruitApplicationByApplicantIdAndRecruitId(recruitId);

  //話を聞く
  const onApplyFor = async () => {
    UserRecruitApplicationRepository.applyFor(recruitId)
      .then(({ style, message, data }: ToastResult) => {
        router.push(`/chat/${data?.roomId}/userChat`);
        if (style === 'failed') {
          showToast({ message, style });
          setTimeout(
            () => {
              hideToast();
              router.reload();
            },
             4000
          );
        }
      })
  };

  return (
    <>
      {/* TODO: roomがある場合はroomに飛べるようにする */}
      {!applicationFromMyself && (
        <button
          onClick={onApplyFor}
          className="ml-5 bg-green-500 text-white px-6 py-2 rounded"
        >
          話を聞く
        </button>
      )}
    </>
  )
}