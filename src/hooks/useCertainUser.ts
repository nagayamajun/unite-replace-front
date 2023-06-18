import { UserRepository } from "@/modules/user/user.repository";
import { useEffect, useState } from "react";
import { User } from "../types/user";

export const useCertainUser = () => {
  const [certainUser, setCertainUser] = useState<User>();

  useEffect(() => {
    (async () => {
      const fetchedUser = await UserRepository.findUserByFirebaseUID();
      setCertainUser(fetchedUser);
    })();
  }, []);

  return { certainUser };
};
