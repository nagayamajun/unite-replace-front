import { useSocket } from "@/adapters/socket.adapter";
import { useMyChatRooms } from "@/application/usecases/getMyChatRooms";
import { useSpecificChatHistory } from "@/application/usecases/getSpecificChatHistory";
import { UserLayoutWithoutNav } from "@/components/layouts/Layout/UserLayoutWithoutNav";
import { SendMessageForm } from "@/ui/chat/shared-components/SendMessageForm";
import { RoomListPC } from "@/ui/chat/shared-components/RoomListPC";
import { RoomListSP } from "@/ui/chat/shared-components/RoomListSP";
import { OneToOneChatRoom } from "@/ui/chat/shared-components/OneToOneChatRoom";
import { useRouter } from "next/router";
import { ReactElement } from "react";

// TODO: UserとEmployeeでページを分ける　
export const Chat = (): JSX.Element => {
  const router = useRouter();
  const { roomId } = router.query;

  const { setSocket } = useSocket();
  const { socket } = setSocket();

  // //画面左に表示されるやりとりリスト
  const { roomList } = useMyChatRooms();
  // 個別chatの履歴
  const { chatHistories, endMessageRef, sender } = useSpecificChatHistory(roomId as string);

  // FIX: なぜかnullが入るため一度このコードで対処
  const notNullRooms = roomList.filter((room) => room !== null);

  return (
    <div className="relative flex min-h-screen w-full grow-0 h-full sm:flex-row items-start bg-white">
      {/* いろんな人とのやりとりリスト */}
      <RoomListPC
        roomId={roomId as string}
        roomList={notNullRooms}
      />

      <RoomListSP
        roomId={roomId as string}
        roomList={notNullRooms}
      />

      {/* 一対一のルーム */}
      <OneToOneChatRoom
        chatHistories={chatHistories}
        endMessageRef={endMessageRef}
        sender={sender}
      />

      {/* 送信フォーム */}
      <SendMessageForm
        socket={socket}
        roomId={roomId as string}
      />
    </div>
  );
};

Chat.getLayout = (page: ReactElement) => <UserLayoutWithoutNav>{page}</UserLayoutWithoutNav>
export default Chat;
