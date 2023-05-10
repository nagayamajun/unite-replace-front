import { UserState } from "@/global-states/atoms";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { SubmitButton } from "../../atoms/SubmitButton";
import { PlainInput } from "../../atoms/PlainInput";
import { GraduationYearRadio } from "../../atoms/GraduationYearRadio";
import { PlainTextArea } from "@/components/atoms/PlainTextarea";

export const OtherThanTechPage = (): JSX.Element => {
  const [userState, setUserState] = useRecoilState(UserState);
  const { register, handleSubmit, control, formState: {errors} } = useForm();
  const router = useRouter();

  const onSubmit = (submitData: any) => {
    setUserState({ ...userState, ...submitData });
    router.push("/profiles/skill");
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
          labelText="名前"
          placeholder="フルネームをご入力ください"
          register={register}
          registerLabel="name"
          errors={errors}
        />
        <PlainInput
          labelText="年齢"
          placeholder="数字のみで年齢をご記入ください"
          register={register}
          registerLabel="age"
          errors={errors}
        />
        <PlainInput
          labelText="都道府県"
          placeholder="兵庫県"
          register={register}
          registerLabel="prefecture"
          errors={errors}
        />
        <PlainInput
          labelText="大学・専門"
          placeholder="〇〇大学"
          register={register}
          registerLabel="university"
          errors={errors}
        />
        <PlainInput
          labelText="学部・学科"
          placeholder="〇〇学部/△△学科"
          register={register}
          registerLabel="undergraduate"
          errors={errors}
        />
        <PlainTextArea
          registerLabel="selfPublicity"
          labelText="自己紹介"
          placeholder="自己PRなどご記入ください"
          register={register}
          errors={errors}
          rules={{required: "必須項目です"}}
        />

        <PlainTextArea
          registerLabel="careerVision"
          labelText="キャリアビジョン"
          placeholder="自身のキャリアについてご記入ください"
          register={register}
          errors={errors}
          rules={{required: "必須項目です"}}
        />
        <GraduationYearRadio control={control} />

        <div className="flex justify-center mt-4">
          <SubmitButton innerText="次へ" />
        </div>
      </form>
    </div>
  );
};


  // id: string;
  // name: string;
  // email: string;
// imageUrl: string;
  // age: number;
  // prefecture: string;
  // university: string;
  // undergraduate: string;
  // selfPublicity: string;
  // careerVision: string;
// programingSkills: Prisma.JsonValue;
