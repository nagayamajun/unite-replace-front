import { PlainInput } from "@/components/atoms/PlainInput"
import { PlainTextArea } from "@/components/atoms/PlainTextarea"
import { SubmitButton } from "@/components/atoms/SubmitButton";
import { SuccessOrFailureModal } from "@/components/organisms/SuccessOrFailureModal";
import { ProductRepositry, submitProductDate } from "@/modules/product/product.repository";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form"

//募集者の管理者ページからproductをアップロードすることができる。
//現在はrecrutIdを指定して対応している。
export const UploadProduct = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { recruitId } = router.query;

  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage ,setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false);

  const onSubmit = async (data: any) => {
    const file = data.file[0];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (!isVideoFile(fileExtension)) {
      // エラー処理などを行う
      router.reload()
    }

    const submitDate: submitProductDate = {
      recruitId: recruitId as string,
      headline: data.headline,
      detail: data.detail,
      file: data.file[0]
    }
    await ProductRepositry.createProduct(submitDate)
      .then(result => {
        if(result) {
          setIsOpen(true)
          setModalMessage(result.message)
          setColor(result.success);

          setTimeout(() => {
            setIsOpen(false)
            if (!result.success) return router.reload();
            router.push("/募集管理者ページ")
          }, 2000)
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
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="flex flex-col justify-center items-center mb-16 text-lg w-1/2 font-bold">
        成果物のアップロード
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col  items-center justify-center w-1/2">
        <PlainInput
          labelText="制作物の動画"
          inputType="file"
          registerLabel="file"
          register={register}
        />
        <PlainInput
          labelText="見出し"
          registerLabel="headline"
          inputType="input"
          register={register}
        />
        <PlainTextArea
          labelText="詳細"
          register={register}
          registerLabel="detail"
        />
        <SubmitButton
          innerText="アップロードする"
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
