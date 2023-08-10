import { PlainInput } from "@/components/molecules/Input/PlainInput";
import { PlainTextArea } from "@/components/molecules/Textarea/PlainTextarea";
import { AddCommentModal } from "@/features/product/components/organisms/Modal/AddCommentModal";
import { EditCommentModal } from "@/features/product/components/organisms/Modal/EditCommentModal";
import { EditProductModal } from "@/features/product/components/organisms/Modal/EditProductModal";
import { UserState } from "@/stores/atoms";
import { productRepository } from "@/features/product/modules/product/product.repository";
import { Product, PathToProductPage } from "@/features/product/types/product"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { ProductFormField } from "@/features/product/components/molecules/Fierld/ProductFormField";
import { Loading } from "../../../../components/organisms/Loading/Loading";
import { ProductLikeButton } from "@/features/product/components/molecules/Button/ProductLikeButton";
import { EmployeeState } from "@/stores/employeeAtom";
import { ProductFormSkillsField } from "../molecules/Fierld/ProductFormSkillsField";
import { SkillSelect } from "@/components/molecules/Select/SkillSelect";


type Props = {
  path: PathToProductPage
}

export const EditProduct = ({ path }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const user = useRecoilValue(UserState);
  const employee = useRecoilValue(EmployeeState)
  const [ product, setProduct ] = useState<Product>();

  const { register, handleSubmit, control, formState: { errors },} = useForm();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isNameOpen, setIsNameOpen ] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isReasonForSkillSelectionOpen, setIsReasonForSkillSelectionOpen] = useState(false);
  const [ isDevelopmentBackgroundOpen, setIsDevelopmentBackgroundOpen ] = useState(false);
  const [ isOverviewOpen, setIsOverviewOpen ] = useState(false);
  const [ isCommentOpen, setIsCommentOpen ] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  }

  useEffect(() =>{
    (async () => {
      if(path === PathToProductPage.UserPath) {
      const fetchedProduct = await productRepository.getProductById(id as string);
      setProduct(fetchedProduct);
      } else {
        const fetchedProduct = await productRepository.getProductByCorporateId(id as string);
        setProduct(fetchedProduct);
      }
      
    })()
  },[])

  //いいねをしているかしていないかの判定に利用する
  const isLiked = product?.employeeToProductLikes?.some((like) => like.employeeId === employee?.id);

  if (product === undefined || isLiked === undefined) return <Loading /> 

  return (
    <div className="flex flex-col w-full min-h-screen h-full justify-center items-center text-gray-600 ">
      <div className="flex flex-col rounded-lg items-center w-4/5 sm:w-sm md:w-md lg:w-lg gap-14  bg-white">
        <div className="flex justify-center items-center w-full mt-10">
          <video src={product?.url} controls className="w-full h-auto rounded-sm"></video>
        </div>
        <div className=" flex flex-col items-center w-full px-5 gap-6">
          {/* headline */}
          <ProductFormField 
            labelText='プロダクト名'
            input={product?.name}
            onCLick={() => setIsNameOpen(true)}
          />
          <EditProductModal
            isOpen={isNameOpen}
            setIsOpen={setIsNameOpen}
            handleSubmit={handleSubmit}
            productId={id as string}
          >
            <PlainInput
              labelText="プロダクト名"
              placeholder="プロダクト名を記述してください"
              register={register}
              registerLabel="name"
            />
          </EditProductModal>

          {/* skills */}
          <ProductFormSkillsField 
            labelText='スキル'
            skills={product?.skills}
            onCLick={() => setIsSkillsOpen(true)}
          />
          <EditProductModal
            isOpen={isSkillsOpen}
            setIsOpen={setIsSkillsOpen}
            handleSubmit={handleSubmit}
            productId={id as string}
          >
            <SkillSelect
              registerLabel="skills"
              labelText="スキル"
              control={control}
              errors={errors}
              placeholder="スキルを選択してください(複数選択可)"
            />
          </EditProductModal>

          {/* 技術選定理由 */}
          <ProductFormField
            labelText="技術選定理由"
            input={product.reasonForSkillSelection}
            onCLick={() => setIsReasonForSkillSelectionOpen(true)}
          />
          <EditProductModal
            isOpen={isReasonForSkillSelectionOpen}
            setIsOpen={setIsReasonForSkillSelectionOpen}
            handleSubmit={handleSubmit}
            productId={id as string}
          >
            <PlainTextArea
              labelText="技術選定理由"
              placeholder="技術選定理由についてお答えください"
              register={register}
              registerLabel="reasonForSkillSelection"
            />
          </EditProductModal>

          {/* 開発背景 */}
          <ProductFormField
            labelText="開発背景"
            input={product.developmentBackground}
            onCLick={() => setIsDevelopmentBackgroundOpen(true)}
          />
          <EditProductModal
            isOpen={isDevelopmentBackgroundOpen}
            setIsOpen={setIsDevelopmentBackgroundOpen}
            handleSubmit={handleSubmit}
            productId={id as string}
          >
            <PlainTextArea
              labelText="開発背景"
              placeholder="開発背景についてお答えください"
              register={register}
              registerLabel="developmentBackground"
            />
          </EditProductModal>

          {/* プロダクト詳細 */}
          <ProductFormField
            labelText="プロダクト概要"
            input={product?.overview}
            onCLick={() => setIsOverviewOpen(true)}
          />
          <EditProductModal
            isOpen={isOverviewOpen}
            setIsOpen={setIsOverviewOpen}
            handleSubmit={handleSubmit}
            productId={id as string}
          >
            <PlainTextArea
              labelText="プロダクト概要"
              placeholder="プロダクトについて詳細に記述してください"
              register={register}
              registerLabel="overview"
            />
          </EditProductModal>

          {/* Fix: 分岐しているコードを見やすくする */}
          {/* プロダクト参加者のアイコンを一覧表示したい。それぞれのユーザーのプロフィールに飛ぶことができる */}
          <div className="flex flex-col items-start w-full gap-5 my-10 border-t border-gray-400 pt-5">
            <div className="flex flex-row justify-between w-full">
              <div className="font-semibold p-2 text-left">個人アピールポイント一覧</div>
              {/* userの時のみコメントを作成できる */}
              { path === PathToProductPage.UserPath && (
                <div>
                  { !product?.comment?.some((comment) => comment.userId === user?.id) ? (
                    <button
                      onClick={() => setIsModalOpen(true)}
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

          { path === PathToProductPage.CorporationPath && (
            <ProductLikeButton 
              productId={product.id as string}
              isPropsLiked={isLiked}
            />
          )}

        </div>
      </div>

      <AddCommentModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        productId={product?.id!}
        setIsOpen={setIsModalOpen}
      />
    </div>
  )
}

