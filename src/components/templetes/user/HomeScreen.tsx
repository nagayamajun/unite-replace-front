import { NarrowSearch } from "@/components/organisms/NarrowSerch";
import { RecruitList } from "../../organisms/RecruitList";

export const HomeScreen = () => {

  return (
    <div className="flex flex-col w-full">
      <NarrowSearch />
      <div className="border-b w-full "></div>
      <RecruitList />
    </div>
  );
};
