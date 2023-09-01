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
import { ProductFormField } from "@/features/product/components/molecules/Fierld/ProductFormField";
import { Loading } from "../../../../components/organisms/Loading/Loading";
import { ProductLikeButton } from "@/features/product/components/molecules/Button/ProductLikeButton";
import { useProductWithApprovedUserRecruitParticipants } from "../../hooks/useProductWithApprovedUserRecruitParticipants";
import { ProductFormSkillsField } from "../molecules/Fierld/ProductFormSkillsField";
import { SkillSelect } from "@/components/molecules/Select/SkillSelect";
import { useIsRelatedUserByRecruitId } from "../../hooks/useIsRelatedUserByRecruitId";
import { OurOwnCommentsList } from "../organisms/List/OurOwnCommentsList";
import { RelatedUsersList } from "../organisms/List/RelatedUsersList";

type Props = {
  path: PathToProductPage;
};

export const EditProduct = ({ path }: Props): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  const { product } = useProductWithApprovedUserRecruitParticipants(
    id as string
  );
  const { isRelatedUser } = useIsRelatedUserByRecruitId(product?.recruitId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [isNameOpen, setIsNameOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isReasonForSkillSelectionOpen, setIsReasonForSkillSelectionOpen] =
    useState(false);
  const [isDevelopmentBackgroundOpen, setIsDevelopmentBackgroundOpen] =
    useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  if (!product) return <Loading />;

  return (
    <div className="flex flex-col w-full min-h-screen h-full justify-center items-center text-gray-600 ">
      <div className="flex flex-col rounded-lg items-center w-4/5 sm:w-sm md:w-md lg:w-lg gap-14  bg-white">
        <div className="flex justify-center items-center w-full mt-10">
          <video
            src={product.url}
            controls
            className="w-full h-auto rounded-sm"
          ></video>
        </div>
        <div className=" flex flex-col items-center w-full px-5 gap-6">
          {/* headline */}
          <ProductFormField
            labelText="プロダクト名"
            input={product.name}
            editable={isRelatedUser}
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
            labelText="スキル"
            skills={product.skills}
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
            editable={isRelatedUser}
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
            editable={isRelatedUser}
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
            editable={isRelatedUser}
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

          {/* コメント一覧 */}
          <OurOwnCommentsList 
            path={path}
            comments={product.comment!}
            productId={product?.id}
          />

          {/* 関わった学生ユーザー一覧 */}
          <RelatedUsersList
            participantsInfo={product.approvedUserRecruitParticipants}
          />

          {/* 企業のみ押すことができるいいねボタン */}
          {path === PathToProductPage.CorporationPath && (
            <ProductLikeButton
              product={product}
            />
          )}
        </div>
      </div>
    </div>
  );
};
