import { recruitRepository } from "@/features/recruit/modules/recruit/recruit.repository";
import { Recruit } from "@/features/recruit/types/recruit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useRecruit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ recruit, setRecruit ] = useState<Recruit>();

  useEffect(() =>{
    (async () => {
      await recruitRepository.getRecruitById(id as string).then(res => setRecruit(res));
    })()
  },[])

  return {
    recruit
  }
}