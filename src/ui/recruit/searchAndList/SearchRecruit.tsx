import { useForm } from "react-hook-form"
import { useRouter } from "next/router";
import { PlainInput } from "@/components/Input/PlainInput";
import { SearchRecruitInput, SearchRecruitInputType } from "@/domein/recruit";
import { zodResolver } from "@hookform/resolvers/zod";

export const SearchRecruit = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<SearchRecruitInputType>({
    resolver: zodResolver(SearchRecruitInput)
  });
  
  const onSubmit = (data: SearchRecruitInputType) => {
    if (!data.search) return router.push("/homeScreen");
    router.push({
      pathname: '/homeScreen',
      query: { search: data.search }
    })
  };

  return (
    <div className="mt-16 flex justify-center">
      <div className="w-96 md:w-md p-4">
        <PlainInput
          inputType="search"
          placeholder="ハッカソン名で検索できます"
          register={register('search')}
          onBlur={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  )
}
