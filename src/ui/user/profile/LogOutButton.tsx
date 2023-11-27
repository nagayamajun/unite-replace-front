import { ConfirmModal } from "@/components/organisms/Modal/ConfirmModal"
import { useState } from "react";
import { PiSignOutBold } from "react-icons/pi"

type Props = {
  isMyself: boolean;
  handleLogOut: () => Promise<void>
}

export const LogOutButton = ({ isMyself, handleLogOut }: Props): JSX.Element => {
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  return (
    <div className={isMyself ? "" : "hidden"}>
      <button
        onClick={() => setIsConfirmOpen(true)}
        className="absolute top-[160px]  right-[40px] flex items-center gap-2 rounded-md p-2 border-2"
      >
        <p className="font-bold text-red-400">ログアウト</p>
        <PiSignOutBold />
      </button>
      <ConfirmModal
          isOpen={isConfirmOpen}
          setIsOpen={setIsConfirmOpen}
          modalTitle="ログアウトしますか？"
          onClickEvent={handleLogOut}
        />
    </div>
  )
}