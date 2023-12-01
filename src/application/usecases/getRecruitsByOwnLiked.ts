import { useGlobalLoading } from "@/adapters/globalState.adapter";
import { useNotice } from "@/adapters/notice.adapter"
import { useRecruit } from "@/adapters/recruit.adapter";
import { Recruit } from "@/domein/recruit";
import { useEffect, useState } from "react";

export const useRecruitByOwnLiked = () => {
  const noticeService = useNotice();
  const loadingService = useGlobalLoading();
  const recruitService = useRecruit();

  const [ recruits, setRecruits ] = useState<Recruit[]>([]);

  useEffect(() => {
    (async() => {
      try {
        loadingService.showLoading();
        const response = await recruitService.getByOwnLiked();
        setRecruits(response);
        loadingService.hideLoading();
      } catch (error: unknown) {
        loadingService.hideLoading();
        const isTypeSafeError = error instanceof Error;
        noticeService.error(`いいねした募集の取得に失敗しました。${isTypeSafeError && error.message}`);
      }
    })()
  }, [])

  return {
    recruits
  }
}