import { FormField } from "@/components/atoms/FormField";
import { PlainInput } from "@/components/atoms/PlainInput";
import { PlainTextArea } from "@/components/atoms/PlainTextarea";
import { AddCommentModal } from "@/components/organisms/AddCommentModal";
import { EditCommentModal } from "@/components/organisms/EditCommentModal";
import { EditProductModal } from "@/components/organisms/EditProductModal";
import { UserState } from "@/global-states/atoms";
import { ProductRepositry } from "@/modules/product/product.repository";
import { Product } from "@/types/product"
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";


export const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useRecoilValue(UserState);
  const [ product, setProduct ] = useState<Product>();

  const { register, handleSubmit, control } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [ isDetailOpen, setIsDetailOpen ] = useState(false);
  const [ isheadline, setIsHeadline ] = useState(false);
  const [ isComment, setIsComment ] = useState(false);


  const closeModal = () => {
    setIsOpen(false);
  }

  useEffect(() =>{
    (async () => {
      const fetchedProduct = await ProductRepositry.getProductById(id as string)
      setProduct(fetchedProduct);
    })()
  },[])


  return (
    <div className="flex flex-col w-full h-full justify-center items-center text-blue-900">
      <div className="text-left w-4/5 mt-20 mb-3">
        <h1 className="font-bold text-2xl">プロダクト詳細</h1>
      </div>
      <div className="flex flex-col rounded-lg items-center w-4/5 bg-gray-200 gap-10 mb-10">
        <div className="flex justify-center items-center w-2/3 h-2/3 mt-10">
          {/* <img src={product?.url} className="object-contain w-full h-full rounded-sm"/> */}
          <video src={product?.url} controls></video>
        </div>
        <div className=" flex flex-col items-center w-2/3 gap-5">
          {/* headline */}
          <FormField
            labelText="題名"
            onCLick={() => setIsHeadline(true)}
          >
            <div className="border rounded-md p-2 border-black">
              {product?.headline}
            </div>
          </FormField>
          <EditProductModal
            isOpen={isheadline}
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

          {/* detail */}
          <FormField
            labelText="詳細"
            onCLick={() => setIsDetailOpen(true)}
          >
            <div className="border rounded-md p-2 border-black">
              {product?.detail}
            </div>
          </FormField>
          
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

          <div className="flex flex-row justify-between w-full border-b border-black pb-2">
            <p>
              {product
                ? product.updatedAt
                  ? format(new Date(product.updatedAt), 'yyyy-MM-dd')
                  : format(new Date(product.createdAt), 'yyyy-MM-dd')
                : ''
              }
            </p>
            {!product?.comment || (product?.comment.length === 0) || !product?.comment.some((comment) => comment.userId === user?.id) ? (
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
        </div>


        <div className="flex flex-col items-start w-2/3 gap-5 mb-10">
          <div className="bg-green-500 text-white p-2 rounded-md text-left">個人コメント一覧</div>
          { !product?.comment && <div className="p-2 rounded-md text-white font-bold bg-red-500">※commentを追加してください</div>}
          {product?.comment?.map((comment) => {
            return (
              <div>
                {
                  user?.id !== comment.userId ? (
                    <div>
                      <FormField
                        labelText={comment.user.name ? comment.user.name : 'unkown'}
                        onCLick={() => setIsComment(true)}
                      >
                        <p>{comment.content}</p>
                      </FormField>
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
                    </div>
                  ) : (
                    <p>{comment.content}</p>
                  )
                }
                {/* <FormField
                  labelText={comment.user.name ? comment.user.name : 'unkown'}
                  onCLick={() => setIsComment(true)}
                >
                  <p>{comment.content}</p>
                </FormField>
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
                </EditCommentModal> */}
              </div>
            )
          })}
        </div>
      </div>


      <AddCommentModal
        isOpen={isOpen}
        closeModal={closeModal}
        productId={product?.id!}
        setIsOpen={setIsOpen}
      />
    </div>
  )
}
