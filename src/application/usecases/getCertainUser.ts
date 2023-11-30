import { useEffect, useState } from "react";
import { User } from "@/domein/user";
import { useUser } from "@/adapters/user.adapter";
import { useNotice } from "@/adapters/notice.adapter";
import { useGlobalLoading } from "@/adapters/globalState.adapter";

export const useCertainUser = (userId: string | undefined) => {
  const loading = useGlobalLoading();
  const noticeService = useNotice();
  const userService = useUser();

  const [certainUser, setCertainUser] = useState<User>();

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        loading.showLoading();
        const response = await userService.findById(userId);
        setCertainUser(response);
        loading.hideLoading();
      } catch (error: unknown) {
        loading.hideLoading();
        const isTypeSafeError = error instanceof Error;
        noticeService.error(`取得に失敗しました。${isTypeSafeError && error.message}`)
      }
    })();
  }, [userId]);

  return { certainUser, setCertainUser };
};
