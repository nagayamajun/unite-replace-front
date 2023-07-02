import { FormField } from "@/components/atoms/FormField";
import { PlainInput } from "@/components/atoms/PlainInput";
import { PlainTextArea } from "@/components/atoms/PlainTextarea";
import { AddCommentModal } from "@/components/organisms/AddCommentModal";
import { EditCommentModal } from "@/components/organisms/EditCommentModal";
import { EditProductModal } from "@/components/organisms/EditProductModal";
import { UserState } from "@/global-states/atoms";
import { ProductRepositry } from "@/modules/product/product.repository";
import { Product } from "@/types/product"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { ProductFormField } from "@/components/atoms/ProductFormField";
import { Loading } from "../common/Loading";

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

  if (product === undefined) return <Loading /> 

  return (
    <div className="flex flex-col w-full h-full justify-center items-center text-gray-600 bg-gray-100">
      <div className="flex flex-col rounded-lg items-center w-4/5 sm:w-base md:w-sm gap-14 mb-10 bg-white">
        <div className="flex justify-center items-center w-4/5 mt-10">
          {/* <img src={product?.url} className="object-contain w-full h-full rounded-sm"/> */}
          <video src={product?.url} controls className="w-full h-60"></video>
        </div>
        <div className=" flex flex-col items-center w-4/5 gap-5">
          {/* headline */}
          <ProductFormField 
            labelText='プロダクト名'
            input={product?.headline}
            onCLick={() => setIsHeadline(true)}
          />

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
              <div className="bg-green-500 text-white p-2 rounded-md text-left">個人アピールポイント一覧</div>
              <div>
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
            { !product?.comment && <div className="p-2 rounded-md text-white font-bold bg-red-500">※アピールポイントを追加してください</div>}
            {product?.comment?.map((comment, index) => {
              return (
                <div key={index} className="flex flex-col w-full">
                  {
                    user?.id === comment.userId ? (
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
                          <p className="font-semibold w-1/2">{comment.user.name}</p>
                        </div>
                        <div className="border rounded-md p-4 border-gray-300">
                          {comment.content}
                        </div>
                      </div>
                    )
                  }
                </div>
              )
            })}
          </div>
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
