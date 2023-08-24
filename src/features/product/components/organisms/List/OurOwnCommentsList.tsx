import { Comment } from "@/features/product/types/comment";
import { PathToProductPage } from "@/features/product/types/product";
import { UserState } from "@/stores/atoms";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { AddCommentModal } from "../Modal/AddCommentModal";
import { ProductFormField } from "../../molecules/Fierld/ProductFormField";
import { EditCommentModal } from "../Modal/EditCommentModal";
import { PlainTextArea } from "@/components/molecules/Textarea/PlainTextarea";
import { useForm } from "react-hook-form";


type Props = {
  path: PathToProductPage;
  comments: Comment[];
  productId: string
}

export const OurOwnCommentsList = ({ path, comments, productId }: Props): JSX.Element => {
  const {
    register,
    handleSubmit,
  } = useForm();
  
  const user = useRecoilValue(UserState);
  const hasMyOwnComment = comments.some(comment => comment.userId === user?.id)

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-start w-full gap-5 my-10 border-t border-gray-400 pt-5">
      <div className="flex flex-row justify-between w-full">
        <div className="font-semibold p-2 text-left">
          個人アピールポイント一覧
        </div>
        {/* productに関連したuserの時のみコメントを作成できる */}
        {path === PathToProductPage.UserPath && (
          <div>
            {hasMyOwnComment ? (
              <p>作成済み</p>
            ) : (
              <button
              onClick={() => setIsModalOpen(true)}
              className="py-2 px-6 rounded-md text-white font-bold bg-green-500 hover:bg-green-600"
              >
                アピールポイント作成
              </button>
            )}
          </div>
        )}
      </div>

      {!hasMyOwnComment && (
        <div className="p-2 rounded-md text-white font-bold bg-red-500">
          ※アピールポイントを追加してください
        </div>
      )}

      {comments.map((comment) => {
        const isMyComment = comment.userId === user?.id;
        return(
          <div key={comment.id} className="flex flex-col w-full">
            <ProductFormField
              labelText={comment.user.name}
              input={comment.content}
              editable={isMyComment}
              onCLick={() => setIsCommentOpen(true)}
            />
            <EditCommentModal
              isOpen={isCommentOpen}
              setIsOpen={setIsCommentOpen}
              commentId={comment.id}
              handleSubmit={handleSubmit}
            >
              <PlainTextArea
                registerLabel="content"
                labelText="アピールポイントを記述してください。"
                placeholder="FEの分野で〇〇に取り組みました....."
                register={register}
              />
            </EditCommentModal>
          </div>
        )
      })}

      <AddCommentModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        productId={productId}
        setIsOpen={setIsModalOpen}
      />
    </div>
  )
}