import { ScoutRepository } from "@/features/user/modules/scout/scout.repository";
import { useToast } from "@/hooks/useToast";
import { EmployeeState, EmployeeStateType } from "@/stores/employeeAtom";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

export type Props = {
  userId: string
}

export const ScoutButton = () => {
  const router = useRouter();
  const { id: userId } = router.query;
  const operatorEmployee = useRecoilValue<EmployeeStateType>(EmployeeState);
  const { showToast, hideToast } = useToast();

  const onScoutFromEmployee = async () => {
    await ScoutRepository.sendScout(userId as string)
      .then((scoutWithRoomId) => {
        router.push(`/chat/${scoutWithRoomId.roomId}`);
      })
      .catch((error) => {
        showToast({message: error.message, style: 'failed'})

        setTimeout(() => {
          hideToast();
        }, 2000);
      });
  };
  return (
    <>
      {operatorEmployee && (
        <button
          onClick={onScoutFromEmployee}
          className="fixed right-20 bottom-16 ml-5 bg-green-500 text-white px-6 py-2 rounded-md"
        >
          スカウトする (話を聞いてみる)
        </button>
      )}
    </>
  )
}