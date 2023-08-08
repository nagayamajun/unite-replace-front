import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository";
import { Recruit } from "@/features/recruit/types/recruit";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { Loading } from "../../../../components/organisms/Loading/Loading";
import { Controller, useForm } from "react-hook-form";
import { PlainInput } from "@/components/molecules/Input/PlainInput";
import { PlainTextArea } from "@/components/molecules/Textarea/PlainTextarea";
import { PlainSelectInput } from "@/components/molecules/Input/PlainSelectInput";
import { FormField } from "@/components/molecules/FormField/FormField";
import { EditProfileModal } from "@/features/user/components/organisms/Modal/EditProfileModal";
import Select from "react-select";
import { ProgramingSkillOptions } from "@/modules/programingSkill/programingSkill.repository";
import { FormRecruitData } from "./AddRecruit";
import { ConfirmModal } from "@/types/confirmModal";
import { SuccessOrFailureModal } from "@/components/organisms/Modal/SuccessOrFailureModal";
import Link from "next/link";

export const EditRecruit = () => {
  const router = useRouter();
  const { id }  = router.query;
  const { register, handleSubmit, control, reset } = useForm();

  const [ isLoading, setIsLoading ] = useState<boolean>(true)
  const [ recruit, setRecruit ] = useState<Recruit>();

  const [isSkillOpen, setIsSkillOpen] = useState(false);

  //失敗/成功notice
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");
  const [noticeColor, setNoticeColor] = useState<boolean>();
  const closeNotice = () => setIsNoticeOpen(false);


  useEffect(() =>{
    (async () => {
      const fetchedRecruit = await recruitRepository.getRecruitById(id as string);
      setRecruit(fetchedRecruit);
      setIsLoading(false)
    })()
  },[])

  if(isLoading || !recruit) return <Loading />

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
    <div className="flex flex-col items-center min-h-screen w-full space-y-6 my-12">
      <h2 className="text-center font-bold ">募集情報編集</h2>
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
        />

        {/* プログラミングスキル */}
        <FormField
          labelText="プログラミングスキル"
          editable={true}
          onCLick={() => setIsSkillOpen(true)}
        >
          <div className="flex flex-wrap gap-4">
            {recruit.programingSkills.map((skill) => (
              <div
                key={skill}
                className="px-8 py-2 rounded-3xl bg-gray-200 text-base"
              >
                {skill}
              </div>
            ))}
          </div>
        </FormField>
        <EditProfileModal
          isOpen={isSkillOpen}
          setIsOpen={setIsSkillOpen}
          onClickOk={handleSubmit(onEditSubmit)}
        >
          <div className="flex flex-col gap-6">
            <div>プログラミングスキル</div>
            <Controller
              name="programingSkills"
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  options={ProgramingSkillOptions}
                  onChange={(selectedSkills) => {
                    field.onChange(selectedSkills.map((skill) => skill.value));
                  }}
                  placeholder="スキル名を選択してください (複数選択可)"
                />
              )}
            />
          </div>
        </EditProfileModal>
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