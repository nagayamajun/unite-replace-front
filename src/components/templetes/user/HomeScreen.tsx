import { Header } from "@/components/organisms/Header";
import { NarrowSearch } from "@/components/organisms/NarrowSerch";
import { useState } from "react";
import { RecruitList } from "../../organisms/RecruitList";

export const HomeScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col w-full">
      <NarrowSearch />
      <div className="border-b w-full "></div>
      <RecruitList />
    </div>
  );
};
