import { useNotice } from "@/adapters/notice.adapter"
import { useRecruit } from "@/adapters/recruit.adapter";
import { Recruit } from "@/domein/recruit";
import { useLoading } from "@/hooks/useLoading";
import { useEffect, useState } from "react";

export const useRecruitByOwnLiked = () => {
  const notice = useNotice();
  const loading = useLoading();
  const recruitService = useRecruit();

  const [ recruits, setRecruits ] = useState<Recruit[]>([]);

  useEffect(() => {
    (async() => {
      try {
        loading.showLoading();
        const response = await recruitService.getByOwnLiked();
        setRecruits(response);
        loading.hideLoading();
      } catch (error: unknown) {
        loading.hideLoading();
        const isTypeSafeError = error instanceof Error;
        notice.error(`いいねした募集の取得に失敗しました。${isTypeSafeError && error.message}`);
      }
    })()
  }, [])

  return {
    recruits
  }
}