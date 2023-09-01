import { useRouter } from "next/router";
import { io } from "socket.io-client";
import { axiosInstance } from "@/libs/axios";
import { useChatRoomList } from "@/features/chat/hooks/useChatRoomList";
import { RoomListPC } from "../organisms/List/RoomListPC";
import { RoomListSP } from "../organisms/List/RoomListSP";
import { OneToOneChatRoom } from "../organisms/Room/OneToOneChatRoom";
import { SendMessageForm } from "../organisms/Form/SendMessageForm";

export const ChatPage = (): JSX.Element => {
  const socket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
    extraHeaders: {
      Authorization: String(
        axiosInstance.defaults.headers.common["Authorization"]
      ),
    },
  });

  const router = useRouter();
  const { roomId } = router.query;
  // //画面左に表示されるやりとりリスト
  const { roomList } = useChatRoomList();

  return (
    <div className="relative flex min-h-screen w-full grow-0 h-full sm:flex-row items-start bg-white">
      {/* いろんな人とのやりとりリスト */}
      <RoomListPC 
        roomId={roomId as string}
        roomList={roomList}
      />

      <RoomListSP
        roomId={roomId as string}
        roomList={roomList}
      />

      {/* 一対一のルーム */}
      <OneToOneChatRoom
        socket={socket}
        roomId={roomId as string}
      />

      {/* 送信フォーム */}
      <SendMessageForm
        socket={socket}
        roomId={roomId as string}
      />
    </div>
  );
};
