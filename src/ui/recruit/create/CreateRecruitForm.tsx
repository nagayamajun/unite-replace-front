import { SkillSelect } from "@/components/Select/SkillSelect";
import { SubmitButton } from "@/components/molecules/Button/SubmitButton";
import { useFormContext } from "react-hook-form";
import { PlainInput } from "@/components/Input/PlainInput";
import { CreateRecruitInputType, Recruit } from "@/domein/recruit";
import { PlainTextArea } from "@/components/Input/PlainTextArea";
import { PlainSelectInput } from "@/components/Select/PlainSelectInput";

type Props = {
  // onSubmit: (data: CreateRecruitInputType) => Promise<void>;
  onSubmit: any;
  recruit?: Recruit
}

export const CreateRecruitForm = ({ onSubmit, recruit }: Props) => {

  const { register, handleSubmit, control, formState: { errors } } = useFormContext<CreateRecruitInputType>();

  return (
    <div className="flex flex-col justify-center items-center h-auto my-8">
      <form className="flex flex-col w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <PlainInput
          inputType="text"
          label="ハッカソン名"
          placeholder="ハッカソン名"
          register={register('hackathonName')}
          error={errors.hackathonName?.message}
          defaultValue={recruit?.hackathonName}
        />
        <PlainInput
          inputType="text"
          label="ひとこと"
          placeholder="見出し"
          register={register('headline')}
          error={errors.headline?.message}
          defaultValue={recruit?.headline}
        />
        <PlainTextArea
          label="詳細"
          placeholder="募集内容について記入"
          register={register('details')}
          error={errors.details?.message}
          defaultValue={recruit?.details}
        />

        <div className="flex space-x-4">
          <PlainInput
            label="開始日"
            inputType="date"
            placeholder="開始日"
            register={register('developmentStartDate')}
            error={errors.developmentStartDate?.message}
            defaultValue={recruit?.developmentStartDate}
          />

          <PlainInput
            label="最終日"
            inputType="date"
            placeholder="最終日"
            register={register('developmentEndDate')}
            error={errors.developmentEndDate?.message}
            defaultValue={recruit?.developmentEndDate}
          />
        </div>

        <PlainSelectInput
          register={register('numberOfApplicants')}
          label="募集人数"
          optionsNum={10}
          error={errors.numberOfApplicants?.message}
          defaultValue={recruit?.numberOfApplicants}
        />


        <PlainInput
          inputType="url"
          label="ハッカソンURL"
          placeholder="url"
          register={register('hackathonUrl')}
          error={errors.hackathonUrl?.message}
          defaultValue={recruit?.hackathonUrl}
        />

        <SkillSelect
          registerLabel="programingSkills"
          labelText="スキル"
          control={control}
          placeholder="スキルを選択してください(複数選択可)"
          errors={errors}
          rules={{ required: "必須項目です" }}
          defaultValue={recruit?.programingSkills}
        />
 
        <div className="mx-auto w-196 pt-16">
          <SubmitButton innerText="作成" />
        </div>
        
      </form>
    </div>
  );
};
