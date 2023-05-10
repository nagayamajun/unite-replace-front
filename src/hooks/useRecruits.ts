import { getRecruits } from "@/modules/recruit/recruit.repository";
import { Recruit } from "@/types/recruit";
import { useState } from "react";
import { useAsync } from "react-async-hook";

export const useRecruits = () => {
  const [recruits, setRecruits] = useState<Recruit[]>([]);

  useAsync(async () => {
    const res = await getRecruits();
    setRecruits(res)
  }, []);

  if (!recruits) return { recruits: []}
  return { recruits }
};

//SSGで取得したからここ要らない
//もしSSGがいまいちとの判断になった際に使う為一旦残しとく
