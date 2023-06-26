import { ChatRepository } from "@/modules/chat/chat.repository";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loading } from "../Loading";
import { io } from "socket.io-client";
import { axiosInstance } from "@/libs/axios";
import { ChatMessage } from "@/types/chatMessage";
import { ChatParticipant } from "@/types/chatParticipant";
import { ChatRoomParticipantRepository } from "@/modules/chatRoomParticipant/chatRoomParticipant.repository";
import { useChatRoomList } from "@/hooks/useChatRoomList";
import { ChatRoom } from "@/types/chatRoom";
import Link from "next/link";
import { isoToJstString } from "@/utils/date";

export const ChatPage = (): JSX.Element => {
  const socket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
    extraHeaders: {
      Authorization: String(
        axiosInstance.defaults.headers.common["Authorization"]
      ),
    },
  });
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { roomId } = router.query;
  const roomList = useChatRoomList();
  const [chatHistories, setChatHistories] = useState<ChatMessage[]>([]);
  const [sender, setSender] = useState<ChatParticipant>();

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (typeof roomId !== "string") return;

      const messages = await ChatRepository.findOneRoomHistory(roomId);
      setChatHistories(messages);

      const senderParticipant =
        await ChatRoomParticipantRepository.findByRoomId(roomId);
      setSender(senderParticipant);

      setIsLoading(false);
    })();
  }, [roomId]);

  useEffect(() => {
    socket.on("toClient", (chatData) => {
      const newHistories = [...chatHistories];
      newHistories.push(chatData);

      setChatHistories(newHistories);
    });
  }, [chatHistories]);

  if (isLoading) return <Loading />;

  const onMessageSubmit = async (submitData: any) => {
    socket.emit("toServer", { ...submitData, roomId });
    reset();
  };

  return (
    <div className="flex h-screen">
      {/* いろんな人とのやりとりリスト */}
      <div className="w-[24%] flex flex-col overflow-y-auto border-r-gray-700">
        {roomList?.map((room: ChatRoom) => (
          <Link
            key={room.id}
            href={`/chat/${room.id}`}
            className={`h-[60px] p-[8px] flex items-center gap-4 ${
              room.id === roomId && "bg-[#0000001a]"
            }`}
          >
            <Image
              src={room.interlocutorImageUrl ?? "/avatar.gif"}
              alt="対話相手のロゴ"
              width={40}
              height={40}
              className="rounded-full border border-black"
            />
            <div>
              <p className="min-h-[19px] text-[16px] font-black leading-[19px]">
                {room.interlocutorName}
              </p>
              <p className="text-[12px] text-gray-500">{room.latestMessage}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* 一対一のルーム */}
      <div className="w-[76%] pb-[160px] flex flex-col gap-[58px] overflow-y-auto">
        {chatHistories.map((chat: ChatMessage) => (
          <div
            key={`${String(chat.createdAt)}`}
            className={`w-1/2 p-[16px] flex gap-[8px] ${
              sender?.id === chat.senderId ? "justify-end" : "justify-start"
            }`}
            style={
              sender?.id === chat.senderId
                ? { alignSelf: "end" }
                : { alignSelf: "start" }
            }
          >
            <Image
              src={chat.senderImage ?? "/avatar.gif"}
              alt="人物アイコンのロゴ"
              width={40}
              height={40}
              className={`${
                sender?.id === chat.senderId ? "hidden" : ""
              } rounded-full border border-black w-[40px] h-[40px]`}
            />
            <div className="bg-white rounded-xl flex-col gap-[8px]">
              <p
                className={`${
                  sender?.id === chat.senderId ? "hidden" : ""
                } text-[14px] font-[900]`}
              >
                {chat.senderName}
              </p>
              <div className="flex items-end gap-[8px]">
                <p
                  className={`${
                    sender?.id === chat.senderId ? "" : "hidden"
                  } text-[12px] text-gray-500`}
                >
                  {isoToJstString(chat.createdAt.toString(), "yyyy/MM/dd")}
                </p>
                <p
                  className={`p-[8px] rounded-xl text-[16px] ${
                    sender?.id === chat.senderId
                      ? "bg-[#8DE055] rounded-tr-none"
                      : "bg-[#0000001a] rounded-tl-none"
                  }`}
                >
                  {chat.content}
                </p>
                <p
                  className={`${
                    sender?.id === chat.senderId ? "hidden" : ""
                  } text-[12px] text-gray-500`}
                >
                  {isoToJstString(chat.createdAt.toString(), "yyyy/MM/dd")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* 送信フォーム */}
      <form
        className="fixed bottom-4 right-4 w-3/5"
        onSubmit={handleSubmit(onMessageSubmit)}
      >
        <div className="flex bg-gray-100 rounded-2xl">
          <textarea
            className="w-full bg-inherit rounded-2xl outline-none p-4"
            {...register("message")}
          />
          <button type="submit">
            <Image
              src="/paperplane.gif"
              alt="メッセージ送信ボタンのロゴ"
              width={40}
              height={40}
            />
          </button>
        </div>
      </form>
    </div>
  );
};
