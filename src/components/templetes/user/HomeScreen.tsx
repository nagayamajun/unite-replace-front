import { NarrowSearch } from "@/components/organisms/NarrowSerch";
import { RecruitList } from "../../organisms/RecruitList";

export const HomeScreen = () => (
  <div className="flex flex-col">
    <NarrowSearch />
    <div className="border-b w-full "></div>
    <RecruitList />
  </div>
);
