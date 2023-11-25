import { UserRepository } from "@/features/user/modules/user/user.repository";
import { useEffect, useState } from "react";
import { useLoading } from "../../hooks/useLoading";
import { User } from "@/domein/user";
import { useUser } from "@/adapters/user.adapter";
import { useNotice } from "@/adapters/notice.adapter";

export const useCertainUser = (userId: string | undefined) => {
  const loading = useLoading();
  const notice = useNotice();
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
        notice.error(`取得に失敗しました。${isTypeSafeError && error.message}`)
      }
    })();
  }, [userId]);

  return { certainUser, setCertainUser };
};
