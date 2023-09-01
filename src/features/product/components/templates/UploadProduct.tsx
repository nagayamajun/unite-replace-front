import { PlainInput } from "@/components/molecules/Input/PlainInput"
import { PlainTextArea } from "@/components/molecules/Textarea/PlainTextarea"
import { SubmitButton } from "@/components/molecules/Button/SubmitButton";
import { SuccessOrFailureModal } from "@/components/organisms/Modal/SuccessOrFailureModal";
import { productRepository, submitProductDate } from "@/features/product/modules/product/product.repository";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { SkillSelect } from "@/components/molecules/Select/SkillSelect";

export const UploadProduct = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();
  const router = useRouter();
  const { recruitId } = router.query;

  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage ,setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    const file = data.file[0];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (!isVideoFile(fileExtension)) {
      // エラー処理などを行う
      router.reload()
    }

    const submitDate: submitProductDate = {
      recruitId: recruitId as string,
      name: data.name,
      skills: data.skills,
      reasonForSkillSelection: data.reasonForSkillSelection,
      developmentBackground: data.developmentBackground,
      overview: data.overview,
      file: data.file[0]
    }

    await productRepository.createProduct(submitDate)
      .then(result => {
        if(result) {
          setIsLoading(false)
          setIsOpen(true)
          setModalMessage(result.message)
          setColor(result.success);

          setTimeout(() => {
            setIsOpen(false)
            if (result.success) return router.push("/homeScreen")
          }, 4000)
        }
      })
  }

  // 動画ファイルの拡張子を検証する関数
  const isVideoFile = (extension: string | undefined): boolean => {
    const allowedExtensions = ["mp4", "mov", "avi"]; // 許可する動画ファイルの拡張子
    if (!extension) return false;
    return allowedExtensions.includes(extension);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen h-full py-5">
      <div className="flex flex-col justify-center items-center my-6 text-lg w-1/2 font-bold">
        成果物のアップロード
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col  items-center justify-center w-1/2">
        <PlainInput
          labelText="制作物の動画(必須項目)"
          inputType="file"
          registerLabel="file"
          register={register}
          errors={errors}
          rules={{required: "必須項目です"}}
        />

        <PlainInput
          labelText="プロダクト名(必須項目)"
          registerLabel="name"
          inputType="input"
          register={register}
          rules={{required: "必須項目です"}}
        />

        <SkillSelect
          registerLabel="skills"
          labelText="スキル(必須項目)"
          control={control}
          placeholder="スキルを選択してください(複数選択可)"
          errors={errors}
          rules={{ required: "必須項目です" }}
        />

        <PlainTextArea
          labelText="技術選定理由(必須項目/1000字以内)"
          register={register}
          registerLabel="reasonForSkillSelection"
          errors={errors}
          rules={{ required: "必須項目です", maxLength: { value: 1000, message: `1000字以下でご記入ください` } }}
        />

        <PlainTextArea
          labelText="開発背景(必須項目/1000字以内)"
          register={register}
          registerLabel="developmentBackground"
          errors={errors}
          rules={{ required: "必須項目です", maxLength: { value: 1000, message: `1000字以下でご記入ください` } }}
        />

        <PlainTextArea
          labelText="プロダクト概要(必須項目/2000字以内)"
          register={register}
          registerLabel="overview"
          errors={errors}
          rules={{ required: "必須項目です", maxLength: { value: 20, message: `2000字以下でご記入ください` } }}
        />

        <SubmitButton
          innerText={isLoading ? 'アップロード中です' : 'アップロードする'}
          disabled={isLoading}
        />
      </form>

      <SuccessOrFailureModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalMessage={modalMessage}
        modalBgColor={color!}
      />
    </div>
  )
  }
