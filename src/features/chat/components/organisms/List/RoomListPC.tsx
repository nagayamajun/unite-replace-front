import { PersonIcon } from "@/components/molecules/Icon/PersonIcon";
import { ChatRoom } from "@/features/chat/types/chatRoom";
import Link from "next/link";

type Props = {
  roomId: string
  roomList: ChatRoom[]
}

export const RoomListPC = ({ roomId, roomList }: Props): JSX.Element => {

  return (
    <div className="hidden min-h-screen h-full md:flex md:w-[24%] flex-col overflow-y-auto border border-r-gray-700 ">
      {roomList?.map((room: ChatRoom) => (
        <Link
          key={room.id}
          href={`/chat/${room.id}`}
          className={`h-[60px] p-[8px] flex items-center gap-4 ${
            room.id === roomId && "bg-[#0000001a]"
          }`}
        >
          <div>
            <PersonIcon
              originalIconImageSrc={room.interlocutorImageUrl}
              originalIconImageAlt={`${room.interlocutorName}のアイコン`}
            />
          </div>
          <div className="mt-4">
            <p className="min-h-[19px] text-[16px] font-black leading-[19px]">
              {room.interlocutorName}
            </p>
            <p className="max-w-[200px] max-h-[20px] text-ellipsis overflow-hidden text-[12px] text-gray-500 h-[36px]">
              {room.latestMessage}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}