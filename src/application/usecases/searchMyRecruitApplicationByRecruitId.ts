import { useEffect, useState } from "react";
import { useNotice } from "@/adapters/notice.adapter";
import { useRecruitApplication } from "@/adapters/recruitApplication.adapter";
import { RecruitApplication } from "@/domein/recruitApplication";

export const useSearchMyRecruitApplicationByRecruitId = (
  recruitId?: string
) => {
  const notice = useNotice();
  const recruitApplicantService = useRecruitApplication();
  const [application, setApplication] = useState<RecruitApplication>();

  useEffect(() => {
    if (!recruitId) return;
    (async () => {
      try {
        const response = await recruitApplicantService.findByApplicantIdAndRecruitId(recruitId);
        setApplication(response);
      } catch (error) {
        const isTypeSafeError = error instanceof Error;
        notice.error(`取得に失敗しました。\n${isTypeSafeError && error.message}`)
      }
    })();
  }, [recruitId]);

  return { application };
};