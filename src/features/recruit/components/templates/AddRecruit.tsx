import { PlainInput } from "@/components/molecules/Input/PlainInput";
import { PlainTextArea } from "@/components/molecules/Textarea/PlainTextarea";
import { SkillSelect } from "@/features/user/components/molecules/Select/SkillSelect";
import { SubmitButton } from "@/components/molecules/Button/SubmitButton";
import { useAuth } from "@/hooks/useAuth";
import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository";
import { ProgrammingSkill } from "@/features/user/types/programingSkill";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { SuccessOrFailureModal } from "@/components/organisms/Modal/SuccessOrFailureModal";

export type FormRecruitData = {
  hackthonName: string;
  headline: string;
  details: string;
  programingSkills: ProgrammingSkill[];
  developmentPeriod: string;
  hackathonUrl: String;
  numberOfApplicants: number; //募集人数
};

export const AddRecruit = () => {
  useAuth();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm();

  //モーダル関係
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [color, setColor] = useState<boolean>();
  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    let userState = localStorage.getItem("UserState");
    if (!userState) return;
    let userId = JSON.parse(userState)["UserState"].uid;

    const recruitData: FormRecruitData = {
      hackthonName: data.hackthonName,
      headline: data.headline,
      details: data.details,
      programingSkills: data.programingSkills,
      developmentPeriod: data.developmentPeriod,
      hackathonUrl: data.hackathonUrl,
      numberOfApplicants: data.numberOfApplicants,
    };

    recruitRepository.createRecuit(recruitData, userId).then((result) => {
      if (result) {
        setIsOpen(true);
        setModalMessage(result.message);
        setColor(result.success);

        setTimeout(() => {
          setIsOpen(false);
          if (!result.success) return router.reload();
          router.push("/homeScreen");
        }, 2000);
      }
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-white p-2">
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
              placepholder="スキルを選択してください(複数選択可)"
              errors={errors}
              rules={{ required: "必須項目です" }}
            />

            {/* プルダウンの背景色を白にしたい */}
            <label htmlFor="numberOfApplicants" className="text-sm">
              募集人数
            </label>
            <select
              id="numberOfApplicants"
              placeholder="募集人数を選択"
              {...register("numberOfApplicants", { required: "必須項目です" })}
              className=" text-gray-400 border border-gray-300 rounded-md shadow-sm p-2 sm:p-3 w-full outline-green-500 mb-6 tex-sm "
            >
              <option value="1">1人</option>
              <option value="2">2人</option>
              <option value="3">3人</option>
              <option value="4">4人</option>
              <option value="5">5人</option>
              <option value="6">6人</option>
            </select>

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

        <SuccessOrFailureModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalMessage={modalMessage}
          modalBgColor={color!}
        />
      </div>
    </div>
  );
};
