import { useApproveParticipant } from "@/application/usecases/approveParticipant";
import { useDeleteRecruit } from "@/application/usecases/deleteRecruit";
import { useGetRecruitWithAuth } from "@/application/usecases/getRecruitWithAuth";
import { useRejectParticipant } from "@/application/usecases/rejectParticipant";
import { PlainButton } from "@/components/Button/PlainButton";
import { H2Title } from "@/components/Title/H2Title";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { CreateRecruitInput, CreateRecruitInputType } from "@/domein/recruit";
import { ApprovedParticipantsList } from "@/ui/recruit/admin-detail/ApprovedParticipantsList";
import { InterestedParticipantList } from "@/ui/recruit/admin-detail/InterestedParticipantList";
import { CreateRecruitForm } from "@/ui/recruit/create/CreateRecruitForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useEditRecruit } from "@/application/usecases/editRecruit";


const OwnRecruitDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { recruit } = useGetRecruitWithAuth(id as string);
  const { deleteRecruit } = useDeleteRecruit();
  const { editRecruit } = useEditRecruit();
  const { approveParticipant } = useApproveParticipant();
  const { rejectParticipant } = useRejectParticipant();

  const interestedParticipants = recruit?.userRecruitParticipant?.filter(participant => !participant.isApproved);
  const approvedParticipants = recruit?.userRecruitParticipant?.filter(participant => participant.isApproved);

  const useFormMethods = useForm<CreateRecruitInputType>({
    resolver: zodResolver(CreateRecruitInput)
  });

  const handleDeleteRecruit = async (id: string) => {
    const isSuccess = await deleteRecruit(id);
    if (isSuccess) router.push('/homeScreen');
  };
  const handleEditRecruit =async ({id, input}: {id: string, input: CreateRecruitInputType}) => {
    await editRecruit({id, input});
  }
  const handleApproveParticipant = async(id: string) => {
    await approveParticipant(id);
    router.reload();
  };
  const handleRejectParticipant = async(id: string) => {
    await rejectParticipant(id);
    router.reload();
  };

  // defaultValueを反映させるために記述している。
  if (!recruit) return <></>
  return (
    <div className="flex flex-col w-base text-sm space-y-14 mb-8">
      <div className="mt-20">
        <H2Title title='募集管理・編集' />
      </div>

      <ApprovedParticipantsList
        approvedParticipants={approvedParticipants}
      />

      <InterestedParticipantList
        interestedParticipants={interestedParticipants}
        handleApproveParticipant={handleApproveParticipant}
        handleRejectParticipant={handleRejectParticipant}
      />

      <hr className="border border-gray-400"/>
      <FormProvider {...useFormMethods}>
        <CreateRecruitForm 
          onSubmit={(data: CreateRecruitInputType) => handleEditRecruit({id: recruit.id, input: data })}
          recruit={recruit}
        />
      </FormProvider>
      <hr className="border border-gray-400"/>

      <div className="mx-auto w-196 h-10 mb-8">
        <PlainButton 
          innerText="募集を削除"
          type="button"
          buttonColor="red"
          onClick={() => handleDeleteRecruit(recruit.id)}
        />
      </div>
    </div>
  )
}

OwnRecruitDetailPage.getLayout = (page: ReactElement) => (
  <UserLayout>{page}</UserLayout>
);

export default OwnRecruitDetailPage
