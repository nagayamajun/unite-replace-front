import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react";
import { PlainTextArea } from "../atoms/PlainTextarea";
import { useForm } from "react-hook-form";
import { commentRepository } from "@/modules/comment/comment.repository";
import { useRouter } from "next/router";


type Props = {
  isOpen: boolean;
  closeModal: () => void;
  productId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCommentModal: React.FC<Props> = ({ isOpen, setIsOpen, closeModal, productId, }): JSX.Element => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async(data: {content: string}) => {

    console.log("提出")
    const formData = {
      content: data.content,
      productId: productId
    }
    await commentRepository.createComment(formData)
    .then(result => {
      if(result) {
        setIsOpen(true)

        setTimeout(() => {
          setIsOpen(false)
          router.reload()
        }, 1000)
      }
    })
  }

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
            <div className="flex items-center justify-center w-full h-screen m-5 p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={`flex flex-col items-center max-w-md transform overflow-hidden rounded-xl p-5 text-left w-2/3 shadow-xl transition-all bg-gray-100 `}>
                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
                    {/* フォームの内容 */}
                    <PlainTextArea
                      registerLabel="content"
                      labelText="アピールポイントを記述してください。"
                      placeholder="FEの分野で〇〇に取り組みました....."
                      register={register}
                      errors={errors}
                    />
                    <button type="submit" className="bg-green-400 rounded-md py-1 px-4 text-white">
                      完了
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

// モーダルを使いたい場所で記述する必要あり。
// const [isOpen, setIsOpen] = useState(false);
// const closeModal = () => {
//   setIsOpen(false);
// }
