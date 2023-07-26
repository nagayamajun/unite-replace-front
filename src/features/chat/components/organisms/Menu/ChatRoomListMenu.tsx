import { useChatRoomList } from "@/hooks/useChatRoomList";
import { ChatRoom } from "@/features/chat/types/chatRoom";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, ReactElement } from "react";
import { PersonIcon } from "../../../../../components/molecules/Icon/PersonIcon";

type Props = {
  children: ReactElement;
};

export const ChatRoomListMenu = ({ children }: Props) => {
  const roomList = useChatRoomList();

  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button>{children}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 right-1 mt-2 sm:right-0 sm:left-11 w-56 sm:w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {roomList?.map((room: ChatRoom) => (
            <Menu.Item key={room.id} as={Fragment}>
              {({ active }) => (
                <Link
                  href={`/chat/${room.id}`}
                  className={`h-[60px] p-[8px] flex items-center gap-4 ${
                    active && "bg-[#0000001a]"
                  }`}
                >
                  <PersonIcon
                    originalIconImageSrc={room.interlocutorImageUrl}
                    originalIconImageAlt={`${room.interlocutorName}のアイコン`}
                  />
                  <div>
                    <p className="min-h-[19px] text-[16px] font-black text-black leading-[19px]">
                      {room.interlocutorName}
                    </p>
                    {/* TODO: 最新メッセージが長い場合 (要素の高さを超える場合は) 「...」で省略表示したい */}
                    <p className="text-[12px] text-gray-500">
                      {room.latestMessage}
                    </p>
                  </div>
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
