import { EmployeeState, EmployeeStateType } from "@/stores/employeeAtom";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useCertainCorporation } from "../../hooks/useCertainCorporation";
import { useEffect, useState } from "react";
import { EditProfileModal } from "@/features/user/components/organisms/Modal/EditProfileModal";
import { PlainInput } from "@/components/molecules/Input/PlainInput";
import { CorporationRepository } from "../../modules/corporation/corporation.repository";
import { PlainTextArea } from "@/components/molecules/Textarea/PlainTextarea";
import { EmployeeList } from "@/features/employee/components/organisms/List/EmployeeList";
import { CorporationIcon } from "@/components/molecules/Icon/CorporationIcon";
import { ToastResult } from "@/types/toast";
import { useToast } from "@/hooks/useToast";

export const CorporationProfile = (): JSX.Element => {
  const router = useRouter();
  const { id: corporationId } = router.query;
  const { showToast, hideToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  //操作employeeとプロフィールのcorporation情報取得
  const operatorEmployee = useRecoilValue<EmployeeStateType>(EmployeeState);
  const isBelongingToCorporation =
    operatorEmployee?.belongToCorporation.id === corporationId;
  const {
    certainCorporation: profileCorporation,
    setCertainCorporation: setProfileCorporation,
    error,
  } = useCertainCorporation(corporationId as string | undefined);

  const [isLoading, setIsLoading] = useState(true);

  const [isImageOpen, setIsImageOpen] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    if (profileCorporation) {
      setIsLoading(false);
    }
    if (error) {
      router.push("/404");
    }
  }, [profileCorporation?.id]);

  const onEditSubmit = async (submitData: any) => {
    await CorporationRepository.update({corporationId: corporationId as string, corporationData: {
      ...submitData,
      imageFile: submitData.imageFile && submitData.imageFile[0],
    }}).then(({ message, style, data }: ToastResult) => {
    showToast({ message, style });
      //userProfileの状態と認証されている自分のrecoil stateを更新
      if (data) setProfileCorporation(data);
      //モーダル系全部閉じる
      setIsImageOpen(false);
      //hook-formのregisterされてる値をリセット
      reset({});
      setTimeout(
        () => {
          hideToast();
        },
        style === 'success' ? 2000 : 4000
      );
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-28 text-[16px] pb-20 w-full h-full">
      {/* プロフィール */}
      <form
        onSubmit={handleSubmit(onEditSubmit)}
        className="flex flex-col gap-20 w-3/4 sm:w-1/2 md:w-1/3"
      >
        <div className="mt-20 flex flex-col items-center gap-2">
          {/* アイコン */}
          <CorporationIcon
            originalIconImageSrc={profileCorporation?.imageUrl}
            originalIconImageAlt={`${profileCorporation?.name}のアイコン`}
            originalIconClassName="rounded-full border border-black w-40 h-40"
            defaultIconFill="gray"
            defaultIconClassName="w-40 h-40 rounded-full bg-white border border-black p-2 color-black-100"
            onClick={() => isBelongingToCorporation && setIsImageOpen(true)}
          />
          <EditProfileModal
            isOpen={isImageOpen}
            setIsOpen={setIsImageOpen}
            onClickOk={handleSubmit(onEditSubmit)}
          >
            <PlainInput
              labelText="アイコン画像"
              placeholder="アイコン画像を変更できます"
              inputType="file"
              register={register}
              registerLabel="imageFile"
            />
          </EditProfileModal>
          {/* 企業名 */}
          <PlainInput
            labelText="企業名"
            placeholder="企業名をご入力ください"
            onBlur={handleSubmit(onEditSubmit)}
            register={register}
            registerLabel="name"
            rules={{ required: "必須項目です" }}
            errors={errors}
            defaultValue={profileCorporation?.name}
            disabled={!isBelongingToCorporation}
            labelFont="text-base"
            inputFont="text-sm sm:text-base"
          />
        </div>
        {/* 所在地 */}
        <PlainInput
          labelText="所在地"
          placeholder="所在地をご入力ください"
          onBlur={handleSubmit(onEditSubmit)}
          register={register}
          registerLabel="location"
          rules={{ required: "必須項目です" }}
          errors={errors}
          defaultValue={profileCorporation?.location}
          disabled={!isBelongingToCorporation}
          labelFont="text-base"
          inputFont="text-sm sm:text-base"
        />
        {/* 自由欄 */}
        <PlainTextArea
          labelText="自由欄"
          placeholder="アピールポイントや企業情報などど自由にご記入ください"
          onBlur={handleSubmit(onEditSubmit)}
          register={register}
          registerLabel="descriptionOfBusiness"
          defaultValue={profileCorporation?.descriptionOfBusiness}
          disabled={!isBelongingToCorporation}
        />
      </form>

      {/* 企業に属している従業員 */}
      <div className="flex flex-col gap-6 w-3/4 sm:w-1/2 overflow-scroll">
        <p>従業員</p>
        {profileCorporation?.employees &&
        profileCorporation.employees.length > 0 ? (
          <EmployeeList employees={profileCorporation.employees} />
        ) : (
          <p className="text-gray-500 my-16 w-full text-center">
            従業員がいません。
          </p>
        )}
      </div>
    </div>
  );
};
