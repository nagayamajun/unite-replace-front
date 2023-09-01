import { PersonIcon } from "@/components/molecules/Icon/PersonIcon";
import { ChatRoom } from "@/features/chat/types/chatRoom";
import Link from "next/link";
import { useState } from "react";

type Props = {
  roomId: string
  roomList: ChatRoom[]
}

export const RoomListSP = ({ roomList, roomId }: Props): JSX.Element => {
  //モバイル画面サイズでのサイドバーを表示するかしないかを判定するboolean
  const [isRoomListOpen, setIsRoomListOpen] = useState<boolean>(false);

  return (
    <>
      {/* スクリーンサイズ:sm未満で表示されるボタンとサイドバー (やりとりリストを表示) */}
      <button
        hidden={isRoomListOpen}
        onClick={() => setIsRoomListOpen(true)}
        className="md:hidden absolute left-1 top-[4px] z-10 w-[46px] h-[44px] py-[6px] border border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2"
      >
        <div hidden={isRoomListOpen} className="w-[25px] text-gray-600">
          →
        </div>
      </button>

      <nav
        className={
          isRoomListOpen
            ? "absolute left-0 z-20 w-1/2 h-full overflow-auto bg-gray-100 rounded-sm font-lato text-lg font-bold duration-300"
            : "hidden duration-300"
        }
      >
        <button
          onClick={() => setIsRoomListOpen(false)}
          className="w-full flex justify-end pr-2 py-2"
        >
          <div className="w-[25px]">←</div>
        </button>
        <div className="flex flex-col overflow-y-auto border-r-gray-700">
          {roomList?.map((room: ChatRoom) => (
            <Link
              key={room.id}
              href={`/chat/${room.id}`}
              className={`h-[60px] p-[8px] flex items-center gap-4 ${
                room.id === roomId && "bg-[#0000001a]"
              }`}
            >
              <PersonIcon
                originalIconImageSrc={room.interlocutorImageUrl}
                originalIconImageAlt={`${room.interlocutorName}のアイコン`}
              />
              <div>
                <p className="min-h-[19px] text-[16px] font-black leading-[19px]">
                  {room.interlocutorName}
                </p>
                <p className="text-[12px] text-gray-500 h-[36px] overflow-hidden overflow-ellipsis">
                  {room.latestMessage}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}