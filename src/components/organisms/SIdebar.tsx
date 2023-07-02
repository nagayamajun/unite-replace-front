import { UserState } from "@/global-states/atoms";
import Link from "next/link"
import { useRecoilValue } from "recoil";
import { CiViewList } from 'react-icons/ci'
import { IoIosCreate } from 'react-icons/io'
import { AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineManageAccounts } from 'react-icons/md'


export const SideBar = (): JSX.Element => {
  const userStateVal = useRecoilValue(UserState);

  const menuLinks = [
    {href: `/homeScreen`, label: '募集一覧', icon: <CiViewList />},
    {href: `/addRecruit`, label: '募集を作成', icon: <IoIosCreate />},
    { href: `/profiles/user/${userStateVal?.id}`, label: "マイページへ", icon: <MdOutlineManageAccounts /> },
    {href: `/profiles/${userStateVal?.id}/myRecruitsAndRelatedRecruits`, label: '参加した/作成した募集', icon: <CiViewList />},
    {href: '/recruit/likedRecruitList', label: 'いいねした募集', icon: <AiOutlineHeart />},
    {href: '/product/myProductsAndRelatedProducts', label: '成果物一覧', icon: <CiViewList />},
    // {href: '/', label: 'お問合せ'},
    // {href: '/', label: 'ログアウト'},
  ]

  return (
    <div className="flex flex-col h-auto sm:w-52 md:w-64  bg-gray-800 text-white ">
      <div className="flex justify-center items-center h-20 border-b border-white mx-2">
        <Link href={"/homeScreen"}>
          <p className="text-xl sm:text-2xl font-bold">
            <span className="text-green-700">T</span>S
            <span className="text-pink-400">U</span>NAGU
          </p>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        { menuLinks.map((e) => (
          <Link href={e.href} className="flex flex-row items-center justify-start font-semibold h-16 ml-2 w-full hover:bg-green-500">
            <div className="text-2xl mr-2">{e.icon}</div>
            <div>{e.label}</div>
          </Link>
        ))}
      </div>


    </div>
  )
}