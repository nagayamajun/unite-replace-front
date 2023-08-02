import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// export type ModalBgColor = 'successColor' | 'failedColor';

type Props = {
  modalBgColor: boolean;
  isOpen: boolean;
  closeModal: () => void;
  modalMessage: string;
};

export const SuccessOrFailureModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  modalMessage,
  modalBgColor,
}): JSX.Element => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-10" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex justify-center m-5 p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={` max-w-md transform overflow-hidden rounded-xl p-3 text-left align-middle shadow-xl transition-all bg-green-400 ${
                    modalBgColor ? "bg-green-400" : "bg-red-400"
                  }`}
                >
                  <div className="mt-2">
                    <p className="text-sm text-white whitespace-pre-wrap">
                      {modalMessage}
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

// モーダルを使いたい場所で記述する必要あり。
// const [isOpen, setIsOpen] = useState(false);
// const closeModal = () => {
//   setIsOpen(false);
// }
