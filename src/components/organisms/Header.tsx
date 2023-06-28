import { UserState } from "@/global-states/atoms";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { ChatRoomListMenu } from "./ChatRoomListMenu";

export const Header = (): JSX.Element => {
  const userStateVal = useRecoilValue(UserState);
  const menuLinks = [
    // {href: `/profiles/${userStateVal?.firebaseUID}`, label: 'マイページへ'},
    {href: '/profiles/editProfile', label: 'マイページへ'},
    {href: `/profiles/${userStateVal?.id}/myRecruitsAndRelatedRecruits`, label: '募集一覧'},
    {href: '/product/myProductsAndRelatedProducts', label: '成果物一覧'},
    {href: '/', label: 'お問合せ'},
    {href: '/', label: 'ログアウト'},
  ]

  return (
    <div className="border-b border-gray-300 w-full">
      <div className="my-1 sm:my-3 flex justify-between">
        <div className="ml-4 flex justify-center items-center">
          <Link href={"/homeScreen"}>
            <p className="text-xl sm:text-2xl font-bold">
              <span className="text-green-700">T</span>S
              <span className="text-pink-400">U</span>NAGU
            </p>
          </Link>
        </div>
        <div className="flex col">
          <ChatRoomListMenu>
            <div className="flex justify-center items-center mr-2">
              <Image src="/chat.gif" alt="Logo" width={40} height={40} />
            </div>
          </ChatRoomListMenu>
          <div className="flex items-center">
            <div className="border h-3/5 mr-2"></div>
          </div>
          <div className="flex col mr-4">
            <p className="font-semibold text-sm sm:text-base mr-4 flex items-center">
              {userStateVal?.name ? userStateVal?.name : "No Name.."}
            </p>
            <Menu>
              <Menu.Button>
                <Image
                  src="/avatar.gif"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="border rounded-full"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-3 mt-14 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {menuLinks.map((link) => (
                    <Menu.Item key={link.href} as={Fragment}>
                      {({ active }) => (
                        <Link
                          href={link.href}
                          className={`${
                            active
                              ? "bg-green-400 text-white"
                              : "bg-white text-black"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};
