import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository";
import { useState } from "react";
import { Loading } from "../../../../components/organisms/Loading/Loading";
import { useForm } from "react-hook-form";
import { PlainInput } from "@/components/molecules/Input/PlainInput";
import { PlainTextArea } from "@/components/molecules/Textarea/PlainTextarea";
import { PlainSelectInput } from "@/components/molecules/Input/PlainSelectInput";
import { SuccessOrFailureModal } from "@/components/organisms/Modal/SuccessOrFailureModal";
import Link from "next/link";
import { useRecruit } from "../../hooks/useRecruit";
import { SkillSelect } from "@/components/molecules/Select/SkillSelect";

export const EditRecruit = () => {
  const { register, handleSubmit, control, reset, formState: {errors} } = useForm();
  const [isSkillOpen, setIsSkillOpen] = useState(false);

  //失敗or成功notice
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");
  const [noticeColor, setNoticeColor] = useState<boolean>();
  const closeNotice = () => setIsNoticeOpen(false);

  const { recruit } = useRecruit();

  if(!recruit) return <Loading />

  const onEditSubmit = async(input: any): Promise<void> => {
    await recruitRepository.editRecruit(recruit.id, input)
    .then((result) => {
      //notice表示
      setIsNoticeOpen(true);
      setNoticeMessage(result.message);
      setNoticeColor(result.success);
      setIsSkillOpen(false)

      reset({});

      setTimeout(() => {
        setIsNoticeOpen(false)
      },
        result.success ? 2000 : 4000
      )
    })
  }

  return(
    <div className="flex flex-col items-center min-h-screen h-full w-full space-y-6 ">
      <h2 className="text-center font-bold my-6">募集情報編集</h2>
      <form
       onSubmit={handleSubmit(onEditSubmit)}
       className="flex flex-col w-96 sm:w-sm"
      >
        <PlainInput
          labelText="ハッカソン名"
          placeholder="ハッカソン名を入力してください"
          onBlur={handleSubmit(onEditSubmit)}
          register={register}
          defaultValue={recruit.hackthonName}
          registerLabel="hackthonName" 
          inputFont="text-sm sm:text-base"
        />

        <PlainInput
          labelText="見出しを一言"
          placeholder="ハッカソン名を入力してください"
          onBlur={handleSubmit(onEditSubmit)}
          register={register}
          defaultValue={recruit.headline}
          registerLabel="headline" 
          inputFont="text-sm sm:text-base"
        />

        <PlainTextArea
          registerLabel="details"
          labelText="募集内容の詳細"
          placeholder="募集内容について細かくご記入ください"
          register={register}
          defaultValue={recruit.details}
          onBlur={handleSubmit(onEditSubmit)}
        />

        <PlainSelectInput
          registerLabel="numberOfApplicants"
          register={register}
          labelText="募集人数を選択"
          defaultValue={recruit.numberOfApplicants}
          onBlur={handleSubmit(onEditSubmit)}
        >
          <option value="1">1人</option>
          <option value="2">2人</option>
          <option value="3">3人</option>
          <option value="4">4人</option>
          <option value="5">5人</option>
          <option value="6">6人</option>
        </PlainSelectInput>

        <PlainInput
          registerLabel="hackathonUrl"
          inputType="url"
          labelText="ハッカソンのURL"
          placeholder="http://sample.jp"
          register={register}
          defaultValue={recruit.hackathonUrl}
          onBlur={handleSubmit(onEditSubmit)}
        />

        <PlainInput
          registerLabel="developmentPeriod"
          labelText="開発・ハッカソン期間"
          placeholder="2023/4/29~2023/5/14"
          register={register}
          defaultValue={recruit.developmentPeriod}
          onBlur={handleSubmit(onEditSubmit)}
        />

        {/* プログラミングスキル */}
        <SkillSelect
          labelText="募集スキル"
          placeholder="募集スキルを選択してください"
          control={control}
          registerLabel="programingSkills"
          errors={errors}
          onBlur={handleSubmit(onEditSubmit)}
        />
      </form>
      <div className="flex flex-col justify-end items-end">
        <Link href={`/recruit/${recruit.id}/ownRecruitDetail`}>戻る</Link>
      </div>
      {/* 成功/失敗notice */}
      <SuccessOrFailureModal
        isOpen={isNoticeOpen}
        closeModal={closeNotice}
        modalMessage={noticeMessage}
        modalBgColor={noticeColor!}
      />
    </div>
  )
}