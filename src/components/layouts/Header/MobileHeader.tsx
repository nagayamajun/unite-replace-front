import { UserState } from "@/stores/atoms";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import { ChatRoomListMenu } from "../../../features/chat/components/organisms/Menu/ChatRoomListMenu";
import { PiChatCircleDotsThin } from "react-icons/pi";
import { PersonIcon } from "../../molecules/Icon/PersonIcon";

export const MobileHeader = (): JSX.Element => {
  const userStateVal = useRecoilValue(UserState);
  const menuLinks = [
    { href: `/profiles/user/${userStateVal?.id}`, label: "マイページへ" },
    {
      href: `/profiles/${userStateVal?.id}/myRecruitsAndRelatedRecruits`,
      label: "募集一覧",
    },
    { href: "/product/myProductsAndRelatedProducts", label: "成果物一覧" },
    { href: "/", label: "お問合せ" },
    { href: "/", label: "ログアウト" },
  ];

  return (
    <div className="border-b border-gray-300 w-full">
      <div className="my-1 sm:my-3 flex justify-between">
        <div className="ml-4 flex justify-center items-center">
          <Link href={"/homeScreen"}>
            <p className="text-xl sm:text-2xl font-bold">
              <span className="text-green-700">U</span>N
              <span className="text-pink-400">I</span>TE
            </p>
          </Link>
        </div>
        <div className="flex">
          <ChatRoomListMenu>
            <div className="flex justify-center items-center p-2">
              <PiChatCircleDotsThin size={36} />
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
                <PersonIcon
                  originalIconImageSrc={userStateVal?.imageUrl}
                  originalIconImageAlt={`${userStateVal?.name}のアイコン`}
                  originalIconClassName="rounded-full border border-black w-40 h-40"
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
                <Menu.Items className="absolute z-20 right-3 mt-14 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
