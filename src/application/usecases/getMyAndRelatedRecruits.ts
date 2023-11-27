import { useNotice } from "@/adapters/notice.adapter"
import { useRecruit } from "@/adapters/recruit.adapter";
import { Recruit } from "@/domein/recruit";
import { useLoading } from "@/hooks/useLoading";
import { useEffect, useState } from "react";

export const useGetMyAndRelatedRecruits = () => {
  const notice = useNotice();
  const loading = useLoading();
  const recruitService = useRecruit();

  const [myRecruits, setMyRecruits] = useState<Recruit[]>([]);
  const [relatedRecruits, setRelatedRecruits] = useState<Recruit[]>([])

  useEffect(() => {
    (async() => {
      try {
        loading.showLoading();
        const myResponse = await recruitService.getOwn();
        setMyRecruits(myResponse);
        const relatedResponse = await recruitService.getRelatedOwn();
        setRelatedRecruits(relatedResponse);
        loading.hideLoading();
      } catch (error: unknown) {
        loading.hideLoading();
        const isTypeSafeError = error instanceof Error;
        notice.error(`いいねした募集の取得に失敗しました。${isTypeSafeError && error.message}`);
      }
    })()
  }, [])

  return {
    myRecruits,
    relatedRecruits
  }
}