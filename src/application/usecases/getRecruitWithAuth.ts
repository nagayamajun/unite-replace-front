import { useNotice } from "@/adapters/notice.adapter";
import { useRecruit } from "@/adapters/recruit.adapter";
import { Recruit } from "@/domein/recruit";
import { useEffect, useState } from "react"

export const useGetRecruitWithAuth = (recruitId: string) => {
  const [ recruit, setRecruit ] = useState<Recruit>();
  const noticeService = useNotice();
  const recruitService = useRecruit();
  
  useEffect(() => {
    (async () => {
      try {
        const response = await recruitService.getByRecruitId(recruitId);
        setRecruit(response)
      } catch (error: unknown) {
        const isTypeSafeError = error instanceof Error;
        noticeService.error(`取得に失敗しました\n${isTypeSafeError && error.message}`)
      }
    })()
  }, [recruitId]);
  
  return {
    recruit
  }
}