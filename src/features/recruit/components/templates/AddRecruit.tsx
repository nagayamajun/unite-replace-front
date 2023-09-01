import { PlainInput } from "@/components/molecules/Input/PlainInput";
import { PlainTextArea } from "@/components/molecules/Textarea/PlainTextarea";
import { SkillSelect } from "@/components/molecules/Select/SkillSelect";
import { SubmitButton } from "@/components/molecules/Button/SubmitButton";
import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository";
import { useRouter } from "next/router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useToast } from "@/hooks/useToast";
import { useRecoilValue } from "recoil";
import { UserState } from "@/stores/atoms";
import { PlainSelectInput } from "@/components/molecules/Input/PlainSelectInput";
import { FormRecruitData } from "../../types/recruit";


export const AddRecruit = () => {
  const { showToast, hideToast } = useToast();
  const router = useRouter();
  const user = useRecoilValue(UserState);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async(data: FieldValues) => {
    const recruitData: FormRecruitData = {
      hackthonName: data.hackthonName,
      headline: data.headline,
      details: data.details,
      programingSkills: data.programingSkills,
      developmentPeriod: data.developmentPeriod,
      hackathonUrl: data.hackathonUrl,
      numberOfApplicants: data.numberOfApplicants,
    };

    await recruitRepository.createRecruit(recruitData, user?.id).then((result) => {
      showToast(result.message, result.style);

      setTimeout(() => {
        hideToast();
        if (result.style === 'success') router.push("/homeScreen");
      }, 2000);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-white p-2">
      <div className="flex flex-col  w-3/4 sm:w-base ">
        <div className="my-5 flex justify-center p-1 bg-gradient-to-r from-green-400 to-green-300 rounded-md">
          <p className="font-bold text-white">募集内容を入力</p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <PlainInput
              registerLabel="hackthonName"
              labelText="ハッカソン名"
              placeholder="ハッカソン名をご記入ください"
              register={register}
              errors={errors}
              rules={{ required: "必須項目です。" }}
            />
            <PlainInput
              registerLabel="headline"
              labelText="見出し"
              placeholder="見出しをご記入ください"
              register={register}
              errors={errors}
              rules={{ required: "必須項目です。" }}
            />
            <PlainTextArea
              registerLabel="details"
              labelText="募集内容の詳細"
              placeholder="募集内容について細かくご記入ください"
              register={register}
              errors={errors}
              rules={{ required: "必須項目です" }}
            />
            <SkillSelect
              registerLabel="programingSkills"
              labelText="スキル"
              control={control}
              placeholder="スキルを選択してください(複数選択可)"
              errors={errors}
              rules={{ required: "必須項目です" }}
            />

            {/* プルダウンの背景色を白にしたい */}
            <PlainSelectInput
              registerLabel="numberOfApplicants"
              register={register}
              labelText="募集人数を選択"
              optionsNum={6}
            />

            <PlainInput
              registerLabel="hackathonUrl"
              inputType="url"
              labelText="ハッカソンのURL"
              placeholder="http://sample.jp"
              register={register}
              errors={errors}
            />

            <PlainInput
              registerLabel="developmentPeriod"
              labelText="開発・ハッカソン期間"
              placeholder="2023/4/29~2023/5/14"
              register={register}
              errors={errors}
            />

            <SubmitButton innerText="募集を作成する" />
          </form>
        </div>
      </div>
    </div>
  );
};
