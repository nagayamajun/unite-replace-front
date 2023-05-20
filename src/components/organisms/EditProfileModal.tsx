import { UserState, UserStateType } from "@/global-states/atoms";
import { UserRepository, updateUserInfo } from "@/modules/user/user.repository";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { useRecoilState } from "recoil";

type EditProfileModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: any;
  userId: string;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
};

export const EditProfileModal = ({
  isOpen,
  setIsOpen,
  children,
  userId,
  handleSubmit,
}: EditProfileModalProps): JSX.Element => {

  const router = useRouter();
  const [user, setUser ] = useRecoilState<UserStateType>(UserState);


  const onEditSubmit = async (submitData: any) => {
    console.log(submitData)
    if (!userId) throw new Error("userStateのRecoilValueが空");
    let updateUser = await updateUserInfo(submitData);
    setUser(updateUser);
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <form onSubmit={handleSubmit(onEditSubmit)}>
                  {children}

                  <div className="mt-4 flex justify-center gap-8">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-red-500 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-green-500 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      保存
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
