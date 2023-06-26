import { authRepository } from "@/modules/auth/auth.repository";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { AuthInput } from "@/components/atoms/AuthInput";

export const CorporateSignIn = () => {
  const router = useRouter();
  const { handleSubmit, register, formState: {errors}} = useForm();

  const onSubmit = () => {
    //今度実装する箇所
    console.log("submit")
  }

  const onClick = (data: any) => {
    //ここは
    authRepository.signUpWithEmail(data.email, data.password)
      .then(() => router.push('/corporation/inputInfo'));
  };

  return (
     <div className="w-full h-screen">
      <div className="flex flex-col h-full items-center justify-center">
        <div className="flex flex-col w-2/3 bg-gray-50 rounded-lg p-10">
          <div className="font-bold text-center">企業様従業員ログイン</div>
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
                ログイン
              </button>
            </div>
          </form>
          <div className="flex flex-col text-center text-sm mt-2">
            <p>企業アカウントをお作りの方は{<Link href={'/corporation/createCorporation'} className="font-bold hover:text-red-500">こちら</Link>}</p>
            <p className="mt-1">アカウント作成の方はこちらから{<Link href={'/corporation/corporateSignUp'} className="font-bold hover:text-red-500">新規登録</Link>}</p>
          </div>
        </div>
      </div>
     </div>
  )
}
    // <div className="flex flex-col items-center h-screen mt-5">
    //   <EmailAndPasswordForm
    //     onSubmit={onSubmit}
    //     buttonText="新規登録"
    //   />

    //   <div className="flex col items-center justify-center sm:w-1/2 w-3/5 ">


    //   <div className="flex justify-center">
    //       <p className="text-sm sm:text-base">アカウンントをお持ちの方　</p>
    //       <Link href="/signUp" className="font-bold">
    //         ログイン
    //       </Link>
    //   </div>

      {/* <SuccessOrFailureModal
        isOpen={isOpen}
        closeModal={closeModal}
        modalMessage={modalMessage}
        modalBgColor={color!}
      /> */}
  // </div>
