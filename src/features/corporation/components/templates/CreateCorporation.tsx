import { PlainInput } from "@/components/molecules/Input/PlainInput";
import { PlainTextArea } from "@/components/molecules/Textarea/PlainTextarea";
import { CorporationRepository } from "@/features/corporation/modules/corporation/corporation.repository";
import { useToast } from "@/hooks/useToast";
import { ToastResult } from "@/types/toast";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export const CreateCorporation = () => {
  const router = useRouter();
  const { showToast, hideToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (submitData: any) => {
    CorporationRepository.create(submitData).then(({ message, style }: ToastResult) => {
      showToast({ message, style });

      setTimeout(() => {
        hideToast();
        if (style === 'success') router.push("/corporation/corporateSignUp");
      }, 2000);
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
    </div>
  );
};
