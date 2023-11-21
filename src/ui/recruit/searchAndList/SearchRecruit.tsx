import { recruitAtomState } from "@/features/recruit/stores/recruitAtom";
import { ProgrammingSkill } from "@/features/user/types/programingSkill";
import { useForm } from "react-hook-form"
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { PlainInput } from "@/components/Input/PlainInput";
import { SearchRecruitInput, SearchRecruitInputType } from "@/domein/recruit";
import { zodResolver } from "@hookform/resolvers/zod";

export const SearchRecruit = () => {
  const router = useRouter();

  const { handleSubmit, register } = useForm<SearchRecruitInputType>({
    resolver: zodResolver(SearchRecruitInput)
  });

  const recruits = useRecoilValue(recruitAtomState);
  
  const onSubmit = (data: SearchRecruitInputType) => {
    
  }

  return (
    <div className="mt-16 flex justify-center">
      <div className="w-96 md:w-md p-4">
        <PlainInput
          inputType="search"
          placeholder="ハッカソン名で検索できます"
          register={register('search')}
        />
      </div>
    </div>
  )
}
