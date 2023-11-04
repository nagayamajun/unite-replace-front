import { useCreateRecruit } from "@/application/usecases/createRecruit";
import { H2Title } from "@/components/Title/H2Title";
import { UserLayout } from "@/components/layouts/Layout/UserLayout";
import { CreateRecruitInput, CreateRecruitInputType } from "@/domein/recruit";
import { CreateRecruitForm } from "@/ui/recruit/create/CreateRecruitForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { FormProvider, useForm } from "react-hook-form";

const createRecruit = () => {
  const router = useRouter();
  const { createRecruit } = useCreateRecruit();

  // react-hook-form
  const useFormMethods = useForm<CreateRecruitInputType>({
    resolver: zodResolver(CreateRecruitInput)
  });

  // createRentalHouseMethods
  const onSubmitToCreateRecruit = async(data: CreateRecruitInputType) => {
    const recruitId = await createRecruit(data);
    if (recruitId !== null) router.push(`/recruit/${recruitId}/ownRecruitDetail`)
  };

  return (
    <section className="w-base h-full">
      <div className="mt-20 mb-10">
        <H2Title title='募集作成' />
      </div>
      <FormProvider {...useFormMethods} >
        <CreateRecruitForm 
          onSubmit={onSubmitToCreateRecruit}
        />
      </FormProvider>
    </section>
  );
};

createRecruit.getLayout = (page: ReactElement) => <UserLayout>{page}</UserLayout>;

export default createRecruit;
