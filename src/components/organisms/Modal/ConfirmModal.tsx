import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";

type ConfirmModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modalTitle: string;
  confirmOkText?: string;
  confirmOkColor?: string;
  onClickEvent: any;
};

export const ConfirmModal = ({
  isOpen,
  setIsOpen,
  modalTitle,
  confirmOkText = "はい",
  confirmOkColor = "red",
  onClickEvent,
}: ConfirmModalProps): JSX.Element => {
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
                <Dialog.Title>{modalTitle}</Dialog.Title>
                <div className="mt-4 flex justify-center gap-8">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black-500 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpen(false)}
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className={`inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-${confirmOkColor}-500 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-${confirmOkColor}-500 focus-visible:ring-offset-2`}
                    onClick={onClickEvent}
                  >
                    {confirmOkText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
