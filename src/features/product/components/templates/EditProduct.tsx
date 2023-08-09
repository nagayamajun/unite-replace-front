import { PlainInput } from "@/components/molecules/Input/PlainInput";
import { PlainTextArea } from "@/components/molecules/Textarea/PlainTextarea";
import { AddCommentModal } from "@/features/product/components/organisms/Modal/AddCommentModal";
import { EditCommentModal } from "@/features/product/components/organisms/Modal/EditCommentModal";
import { EditProductModal } from "@/features/product/components/organisms/Modal/EditProductModal";
import { UserState } from "@/stores/atoms";
import { PathToProductPage } from "@/features/product/types/product";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { ProductFormField } from "@/features/product/components/molecules/Fierld/ProductFormField";
import { Loading } from "../../../../components/organisms/Loading/Loading";
import { ProductLikeButton } from "@/features/product/components/molecules/Button/ProductLikeButton";
import { EmployeeState } from "@/stores/employeeAtom";
import { UserCard } from "@/features/user/components/organisms/Card/UserCard";
import { useProductWithApprovedUserRecruitParticipants } from "../../hooks/useProductWithApprovedUserRecruitParticipants";

type Props = {
  path: PathToProductPage;
};

export const EditProduct = ({ path }: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const user = useRecoilValue(UserState);
  const employee = useRecoilValue(EmployeeState);
  const { product } = useProductWithApprovedUserRecruitParticipants(
    id as string
  );

  const { register, handleSubmit, control } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isHeadline, setIsHeadline] = useState(false);
  const [isComment, setIsComment] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  //いいねをしているかしていないかの判定に利用する
  const isLiked = product?.employeeToProductLikes?.some(
    (like) => like.employeeId === employee?.id
  );

  if (product === undefined || isLiked === undefined) return <Loading />;

  return (
    <div className="flex flex-col w-full h-full min-h-screen justify-center items-center text-gray-600 ">
      <div className="flex flex-col rounded-lg items-center w-4/5 sm:w-base md:w-sm gap-14 mb-10 bg-white">
        <div className="flex justify-center items-center w-4/5 mt-10">
          <video src={product?.url} controls className="w-full h-60"></video>
        </div>
        <div className=" flex flex-col items-center w-4/5 gap-5">
          {/* headline */}
          <ProductFormField
            labelText="プロダクト名"
            input={product?.headline}
            onCLick={() => setIsHeadline(true)}
          />

          <EditProductModal
            isOpen={isHeadline}
            setIsOpen={setIsHeadline}
            handleSubmit={handleSubmit}
            productId={id as string}
          >
            <PlainInput
              labelText="headline"
              placeholder="headlineについてまとめてください"
              register={register}
              registerLabel="headline"
            />
          </EditProductModal>

          {/* プロダクト詳細 */}
          <ProductFormField
            labelText="プロダクト詳細"
            input={product?.detail}
            onCLick={() => setIsDetailOpen(true)}
          />

          <EditProductModal
            isOpen={isDetailOpen}
            setIsOpen={setIsDetailOpen}
            handleSubmit={handleSubmit}
            productId={id as string}
          >
            <PlainTextArea
              labelText="detail"
              placeholder="プロダクトについて詳細に記述してください"
              register={register}
              registerLabel="detail"
            />
          </EditProductModal>

          {/* プロダクト参加者のアイコンを一覧表示したい。それぞれのユーザーのプロフィールに飛ぶことができる */}

          <div className="flex flex-col items-start w-full gap-5 mb-10 border-t border-gray-400 pt-5">
            <div className="flex flex-row justify-between w-full">
              <div className="bg-green-500 text-white p-2 rounded-md text-left">
                個人アピールポイント一覧
              </div>
              {/* userの時のみコメントを作成できる */}
              {path === PathToProductPage.UserPath && (
                <div>
                  {!product?.comment?.some(
                    (comment) => comment.userId === user?.id
                  ) ? (
                    <button
                      onClick={() => setIsOpen(true)}
                      className="py-2 px-6 rounded-md text-white font-bold bg-green-500 hover:bg-green-600"
                    >
                      Comment作成
                    </button>
                  ) : (
                    product?.comment.map((comment) => (
                      <div key={comment.id}>
                        {comment.userId === user?.id && <p>作成済み</p>}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
            {!product?.comment && (
              <div className="p-2 rounded-md text-white font-bold bg-red-500">
                ※アピールポイントを追加してください
              </div>
            )}
            {product?.comment?.map((comment, index) => {
              return (
                <div key={index} className="flex flex-col w-full">
                  {user?.id === comment.userId ? (
                    <>
                      <ProductFormField
                        labelText={comment.user.name}
                        input={comment.content}
                        onCLick={() => setIsComment(true)}
                      />
                      <EditCommentModal
                        isOpen={isComment}
                        setIsOpen={setIsComment}
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
                    </>
                  ) : (
                    <div className="w-full flex flex-col">
                      <div className="flex flex-row w-full mb-3">
                        <p className="font-semibold w-1/2">
                          {comment.user.name}
                        </p>
                      </div>
                      <div className="border rounded-md p-4 border-gray-300">
                        {comment.content}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 関わった学生ユーザー一覧 */}
          <div className="w-full flex gap-4 flex-wrap">
            {product.approvedUserRecruitParticipants.map((participant) => (
              <div key={participant.id}>
                <UserCard user={participant.user} />
              </div>
            ))}
          </div>

          {path === PathToProductPage.CorporationPath && (
            <ProductLikeButton
              productId={product.id as string}
              isPropsLiked={isLiked}
            />
          )}
        </div>
      </div>

      <AddCommentModal
        isOpen={isOpen}
        closeModal={closeModal}
        productId={product?.id!}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};
