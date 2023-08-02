import { db } from "@/libs/firebase";
import { collection, getDocs } from "firebase/firestore";
import { GraduationYear } from "../../features/user/types/graduationYear";

export const GraduationYearRepository = {
  async findMany(): Promise<GraduationYear[]> {
    const querySnapShot = await getDocs(collection(db, "graduation_years"));
    const years = querySnapShot.docs.map((doc) => doc.data() as GraduationYear);
    return years;
  },
};
