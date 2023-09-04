import { ConfirmModal } from "@/components/organisms/Modal/ConfirmModal"
import { authRepository } from "@/features/auth/modules/auth/auth.repository";
import { useToast } from "@/hooks/useToast";
import { UserStateType } from "@/stores/atoms";
import { ToastResult } from "@/types/toast";
import { useRouter } from "next/router";
import { useState } from "react";
import { PiSignOutBold } from "react-icons/pi"
import { SetterOrUpdater } from "recoil";

type Props = {
  setMyselfState: SetterOrUpdater<UserStateType>;
  isMyself: boolean;
}

export const LogOutButton = ({ setMyselfState, isMyself }: Props): JSX.Element => {
  const router = useRouter();
  const { showToast, hideToast } = useToast();

  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const onSignOut = async (): Promise<void> => {
    await authRepository.logOut().then(({message, style}: ToastResult) => {
      setMyselfState(null);
      localStorage.clear();

      showToast({ message, style });
      setTimeout(
        () => {
          hideToast();
          if (style === 'success') router.push("/signIn");
        },
        style === 'success' ? 1000 : 3000
      );
    });
  };

  return (
    <div className={isMyself ? "" : "hidden"}>
      <button
        onClick={() => setIsConfirmOpen(true)}
        className="absolute top-[70px] sm:top-[20px] right-[20px] flex items-center gap-2 rounded-md p-2 border-2"
      >
        <p className="font-bold text-red-400">ログアウト</p>
        <PiSignOutBold />
      </button>
      <ConfirmModal
          isOpen={isConfirmOpen}
          setIsOpen={setIsConfirmOpen}
          modalTitle="ログアウトしますか？"
          onClickEvent={onSignOut}
        />
    </div>
  )
}