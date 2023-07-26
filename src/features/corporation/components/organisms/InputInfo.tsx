import { SubmitButton } from "@/components/molecules/Button/SubmitButton";
import { PlainInput } from "@/components/molecules/Input/PlainInput";
import { useCorporateAuth } from "@/hooks/useCorporateAuth";
import { CorporationRepositry } from "@/features/corporation/modules/corporation/corporation.repository";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form"
import { Corporation } from "../../types/corporation";


export const InputInfo = () => {
  const corporation = useCorporateAuth();
  const router = useRouter()
  const { handleSubmit, register } = useForm();

  // const onSubmit = (submitData: any) => {
  //   let data: Corporation = {
  //     uid: corporation!.uid,
  //     corporation_name: submitData.corporation_name,
  //     phone_number: submitData.phone_number,
  //     introduction: submitData.introduction
  //   }
  //   CorporationRepositry.update(corporation!.uid, data);
  //   router.push('/corporation')
  // }

  return (
    <>
      <div className="flex flex-col justify-center px-80 h-screen text-lg">
        <form
          // onSubmit={handleSubmit(onSubmit)}
          className="container flex flex-col gap-16 max-w-500"
        >
          <PlainInput
            labelText="企業名"
            placeholder="正式名称でご記入ください"
            register={register}
            registerLabel="corporation_name"
          />
          <PlainInput
            labelText="電話番号"
            placeholder="数字のみでご入力ください"
            register={register}
            registerLabel="phone_number"
          />

          <div className="flex flex-col gap-6 text-lg">
            <label htmlFor="nameInput">自由欄</label>
            <textarea
              {...register("introduction", {
                required: '必須入力です'
              })}
              placeholder="アピールポイントや企業情報などど自由にご記入ください"
              className="border-b bg-inherit border-black w-full outline-none"
            />
          </div>
        <div className="flex justify-center mt-2">
          <SubmitButton innerText="完了" />
        </div>
        </form>
      </div>
    </>
  )
}
