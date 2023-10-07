import { useForm } from "react-hook-form"
import { PlainInput } from "@/components/Input/PlainInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlainButton } from "@/components/Button/PlainButton";
import { AuthWithEmailAndPasswordSchema } from "../types/schema";

type Props = {
  onSubmit :(data: any) => void;
  buttonText: string
}
export const EmailAndPasswordForm: React.FC<Props> = ({ onSubmit, buttonText }):JSX.Element => {

  // react-hook-form
  const { handleSubmit, register, formState: {errors}} = useForm({
    resolver: zodResolver(AuthWithEmailAndPasswordSchema)
  });

  return (
      <form className="flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
        <PlainInput
          label="メールアドレス"
          placeholder="example@gmail.com"
          inputType="email"
          register={register}
          registerValue="email"
          error={errors.email?.message as string}
        />

        <PlainInput
          label="パスワード"
          placeholder="8文字以上でご入力ください"
          inputType="password"
          register={register}
          registerValue="password"
          error={errors.password?.message as string}
        />

        <div className="flex justify-center mt-8">
          <PlainButton
            innerText={buttonText}
            type="submit"
          />
        </div>
      </form>
  )
}

