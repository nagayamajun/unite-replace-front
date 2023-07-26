import { GraduationYearRepository } from "@/modules/graduationYear/graduationYear.repository";
import { useEffect, useState } from "react";
import { GraduationYear } from "../features/user/types/graduationYear";

export const useGraduationYears = () => {
  const [graduationYears, setGraduationYears] = useState<GraduationYear[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedYears = await GraduationYearRepository.findMany();
      setGraduationYears(fetchedYears);
    })();
  }, []);

  return { graduationYears };
};
