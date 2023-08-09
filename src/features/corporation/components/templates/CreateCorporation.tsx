import { PlainInput } from "@/components/molecules/Input/PlainInput";
import { PlainTextArea } from "@/components/molecules/Textarea/PlainTextarea";
import { SuccessOrFailureModal } from "@/components/organisms/Modal/SuccessOrFailureModal";
import { CorporationRepository } from "@/features/corporation/modules/corporation/corporation.repository";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const CreateCorporation = () => {
  const router = useRouter();
  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (submitData: any) => {
    CorporationRepository.create(submitData).then((result) => {
      if (result) {
        setIsOpen(true);
        setModalMessage(result.message);
        setColor(result.success);

        setTimeout(() => {
          setIsOpen(false);
          if (!result.success) return router.reload();
          router.push("/corporation/corporateSignUp");
        }, 2000);
      }
    });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-2 font-bold bg-green-400 rounded-lg p-2 text-white w-2/3">
        <p className="text-center">企業を作成</p>
      </div>
      <form
        className="flex flex-col w-2/3 h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <PlainInput
          labelText="企業名"
          inputType="text"
          placeholder="企業名をご記入ください"
          register={register}
          registerLabel="name"
          rules={{ required: "必須項目です。" }}
          errors={errors}
        />
        <PlainInput
          labelText="企業メールアドレス"
          inputType="email"
          placeholder="example@example.com"
          register={register}
          registerLabel="email"
          rules={{ required: "必須項目です。" }}
          errors={errors}
        />
        {/* <PlainInput
          labelText="アイコン"
          inputType="file"
          placeholder="企業名をご記入ください"
          register={register}
          registerLabel="imageUrl"
        /> */}
        <PlainInput
          labelText="パスワード(*従業員の認証の際に利用します)"
          inputType="password"
          placeholder="パスワード"
          register={register}
          registerLabel="sharedPassword"
          rules={{ required: "必須項目です。" }}
          errors={errors}
        />
        <PlainInput
          labelText="所在地"
          inputType="text"
          placeholder="東京都"
          register={register}
          registerLabel="location"
          rules={{ required: "必須項目です。" }}
          errors={errors}
        />
        <PlainInput
          labelText="電話番号"
          inputType="text"
          placeholder="012345678"
          register={register}
          registerLabel="phoneNumber"
          rules={{ required: "必須項目です。" }}
          errors={errors}
        />
        <PlainTextArea
          labelText="企業説明"
          placeholder="企業様の詳細情報をご記入ください。"
          register={register}
          registerLabel="descriptionOfBusiness"
          rules={{ required: "必須項目です。" }}
          errors={errors}
        />
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="w-full h-10 sm:h-14 p-1 rounded-md font-bold mb-3 text-center sm:text-base text-sm bg-green-500 text-white"
          >
            新規登録
          </button>
        </div>
      </form>

      <SuccessOrFailureModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalMessage={modalMessage}
        modalBgColor={color!}
      />
    </div>
  );
};
