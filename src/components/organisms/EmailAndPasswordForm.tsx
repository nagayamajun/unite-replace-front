import { useForm } from "react-hook-form"
import { AuthInput } from "../atoms/AuthInput"

type Props = {
  onSubmit :(data: any) => void;
  buttonText: string
}
export const EmailAndPasswordForm: React.FC<Props> = ({ onSubmit, buttonText }):JSX.Element => {

  const { handleSubmit, register, formState: {errors}} = useForm()
  return (

    <>
      <form className="flex-col sm:w-1/2 w-3/5" onSubmit={handleSubmit(onSubmit)}>
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

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="w-full h-10 sm:h-14 p-1 rounded-md font-bold mb-3 text-center sm:text-base text-sm bg-green-500 text-white"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </>
  )
}

