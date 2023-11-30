import { useGlobalLoading } from "@/adapters/globalState.adapter";
import { useNotice } from "@/adapters/notice.adapter"
import { useRecruit } from "@/adapters/recruit.adapter";
import { Recruit } from "@/domein/recruit";
import { useEffect, useState } from "react";

export const useGetMyAndRelatedRecruits = () => {
  const noticeService = useNotice();
  const loadingService = useGlobalLoading();
  const recruitService = useRecruit();

  const [myRecruits, setMyRecruits] = useState<Recruit[]>([]);
  const [relatedRecruits, setRelatedRecruits] = useState<Recruit[]>([])

  useEffect(() => {
    (async() => {
      try {
        loadingService.showLoading();
        const myResponse = await recruitService.getOwn();
        setMyRecruits(myResponse);
        const relatedResponse = await recruitService.getRelatedOwn();
        setRelatedRecruits(relatedResponse);
        loadingService.hideLoading();
      } catch (error: unknown) {
        loadingService.hideLoading();
        const isTypeSafeError = error instanceof Error;
        noticeService.error(`いいねした募集の取得に失敗しました。${isTypeSafeError && error.message}`);
      }
    })()
  }, [])

  return {
    myRecruits,
    relatedRecruits
  }
}