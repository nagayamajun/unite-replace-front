import { UserRepository } from "@/features/user/modules/user/user.repository";
import { useEffect, useState } from "react";
import { User } from "../features/user/types/user";
import { useLoading } from "./useLoading";

export const useCertainUser = (userId: string | undefined) => {
  const { showLoading, hideLoading } = useLoading();
  const [certainUser, setCertainUser] = useState<User>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!userId) return;
    (async () => {
      showLoading();
      await UserRepository.findUserById(userId)
        .then((user) => setCertainUser(user))
        .catch((error) => setError(error));
      hideLoading();
    })();
  }, [userId]);

  return { certainUser, setCertainUser, error };
};
