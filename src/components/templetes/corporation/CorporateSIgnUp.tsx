import { authRepository } from "@/modules/auth/auth.repository";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthInput } from "@/components/atoms/AuthInput";
import { useState } from "react";
import { SuccessOrFailureModal } from "@/components/organisms/SuccessOrFailureModal";

type FormData = {
  email: string;
  password: string;
  sharedPassword: string;
}

export const CorporateSignUp = () => {
  const router = useRouter();
  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage ,setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => setIsOpen(false)
  const { handleSubmit, register, formState: {errors}} = useForm();

  const onSubmit: SubmitHandler<any> = ({email, password, sharedPassword}: FormData) => {
    authRepository.employeeSignUpWithEmail(email, password, sharedPassword)
    .then((result) => {
      if(result) {
        setIsOpen(true)
        setModalMessage(result.message)
        setColor(result.success)

        setTimeout(() => {
          setIsOpen(false)
          router.push('/corporation/corporateSignIn')
        },
        result.success ? 2000 : 4000
        )
      }
    })
  }

  return (
     <div className="w-full h-screen">
      <div className="flex flex-col h-full items-center justify-center">
        <div className="flex flex-col w-2/3 bg-gray-50 rounded-lg p-10">
          <div className="font-bold text-center">企業様従業員アカウント作成</div>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <AuthInput
              labelText="メールアドレス"
              placeholder="example@gmail.com"
              buttonType="email"
              register={register}
              registerLabel="email"
              rules={{required: "*必須項目です"}}
              errors={errors}
            />

            <AuthInput
              labelText="パスワード"
              placeholder="More than 10 letters"
              buttonType="password"
              register={register}
              registerLabel="password"
              rules={{ required: "*必須項目です。", minLength: {value: 8, message: "*8文字以上で入力ください。"}}}
              errors={errors}
            />
            <AuthInput
              labelText="企業パスワード"
              buttonType="password"
              placeholder="企業パスワードをご入力ください"
              register={register}
              registerLabel="sharedPassword"
              rules={{required: "必須項目です。"}}
              errors={errors}
            />
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="w-full h-10 sm:h-14 p-1 rounded-md font-bold mb-3 text-center sm:text-base text-sm bg-green-500 text-white"
              >
                新規登録
              </button>
            </div>
          </form>
          <div className="flex flex-col text-center text-sm mt-2">
            <p>企業アカウントをお作りの方は{<Link href={'/corporation/createCorporation'} className="font-bold hover:text-red-500">こちら</Link>}</p>
            <p className="mt-1">アカウントお持ちの方はこちらから{<Link href={'/corporation/corporateSignIn'} className="font-bold hover:text-red-500">ログイン</Link>}</p>
          </div>
        </div>
      </div>

      <SuccessOrFailureModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalMessage={modalMessage}
        modalBgColor={color!}
      />
     </div>
  )
}
