import Link from "next/link";
import { CiViewList } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";

export const CorporateSideBar = (): JSX.Element => {

  const menuLinks = [
    {href: `/corporation`, label: '成果物一覧', icon: <CiViewList />},
    {href: `/`, label: "マイページへ", icon: <MdOutlineManageAccounts /> },
    {href: '/product/myProductsAndRelatedProducts', label: '所属企業情報', icon: <CiViewList />},
    // {href: '/', label: 'お問合せ'},
    // {href: '/', label: 'ログアウト'},
  ]

  return (
    <div className="flex flex-col bg-gray-700 text-white text-sm sm:text-xl h-auto  w-40 sm:w-60">
      <div className="flex justify-center items-center h-20 border-b border-white mx-2">
        <Link href={"/corporation"}>
          <p className="text-xl sm:text-2xl font-bold">
            <span className="text-green-700">U </span>N 
            <span className="text-pink-400"> I </span>T E
          </p>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        { menuLinks.map((e, index) => (
          <Link key={index} href={e.href} className="flex flex-row items-center justify-start font-semibold h-16 ml-4 w-full hover:bg-green-500">
            <div className="text-2xl mr-2">{e.icon}</div>
            <div>{e.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
