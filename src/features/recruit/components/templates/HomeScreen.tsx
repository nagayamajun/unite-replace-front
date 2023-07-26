import { NarrowSearch } from "@/features/recruit/components/organisms/Search/NarrowSerch";
import { RecruitList } from "../organisms/List/RecruitList";

export const HomeScreen = () => {

  return (
    <div className="flex flex-col w-full">
      <NarrowSearch />
      <div className="border-b w-full "></div>
      <RecruitList />
    </div>
  );
};
