import { UserState, UserStateType } from "@/stores/atoms";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { PlainInput } from "@/components/Input/PlainInput";
import { UserInput, UserInputType } from "@/domein/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlainTextArea } from "@/components/Input/PlainTextArea";
import { GraduationYearRadio } from "@/features/user/components/molecules/Radio/GraduationYearRadio";
import { SubmitButton } from "@/components/molecules/Button/SubmitButton";
import { useUpdateUserInfo } from "@/application/usecases/updateUserInfo";

export const OtherThanTechPage = (): JSX.Element => {
  const router = useRouter();
  const { updateUserInfo } = useUpdateUserInfo();
  
  const [userState, _] = useRecoilState<UserStateType>(UserState);
  const { register, handleSubmit, control, formState: { errors } } = useForm<UserInputType>({
    resolver: zodResolver(UserInput)
  });

  const onSubmit = async (submitData: any): Promise<void> => {
    const isSuccess = await updateUserInfo({ ...userState, ...submitData });
    if (isSuccess) router.push("/profiles/user/skill");
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col justify-center items-center my-5 ">
        <p className=" font-bold">情報を登録する</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 w-1/2 sm:w-3/5"
      >
        <PlainInput
          inputType="text"
          label="名前"
          placeholder="フルネームをご入力ください"
          defaultValue={userState?.name}
          register={register('name')}
          error={errors.name?.message as string}
        />
        <PlainInput
          inputType="text"
          label="年齢"
          placeholder="数字で年齢をご記入ください"
          defaultValue={userState?.age}
          register={register('age')}
          error={errors.age?.message}
        />
        <PlainInput
          label="都道府県"
          inputType="text"
          placeholder="都道府県を選択してください"
          defaultValue={userState?.prefecture}
          register={register('prefecture')}
          error={errors.prefecture?.message}
        />
        <PlainInput
          label="大学・専門"
          inputType="text"
          placeholder="大学名を入力してください"
          defaultValue={userState?.university}
          register={register('university')}
          error={errors.university?.message}
        />
        <PlainInput
          label="学部・学科"
          inputType="text"
          placeholder="学部・学科を選択してください"
          defaultValue={userState?.undergraduate}
          register={register('undergraduate')}
          error={errors.university?.message}
        />
        <PlainTextArea
          label="自己紹介"
          placeholder="自己PRなどご記入ください"
          defaultValue={userState?.selfPublicity}
          register={register('selfPublicity')}
          error={errors.selfPublicity?.message}
        />
        <PlainTextArea
          label="キャリアビジョン"
          placeholder="自身のキャリアについてご記入ください"
          defaultValue={userState?.careerVision}
          register={register('careerVision')}
          error={errors.careerVision?.message}
        />
        <GraduationYearRadio
          control={control}
          defaultValue={userState?.graduateYear}
        />

        <div className="flex justify-center mt-4">
          <SubmitButton innerText="次へ" />
        </div>
      </form>
    </div>
  );
};


export default OtherThanTechPage