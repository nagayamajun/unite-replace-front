import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
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
import { ChatRepository } from "@/modules/chat/chat.repository";
import { PersonIcon } from "@/components/atoms/PersonIcon";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { roomId } = router.query;
  //画面左に表示されるやりとりリスト
  const roomList = useChatRoomList();
  //チャット履歴を管理するstate
  const [chatHistories, setChatHistories] = useState<ChatMessage[]>([]);
  //メッセージを送る主体 (ログインユーザー)
  const [sender, setSender] = useState<ChatParticipant>();
  //モバイル画面サイズでのサイドバーを表示するかしないかを判定するboolean
  const [isRoomListOpen, setIsRoomListOpen] = useState<boolean>(false);
  // 最新のメッセージの表示位置の直下を監視するためのref
  const endMessageRef = useRef<HTMLDivElement>(null);

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

      //メッセージ履歴を更新
      setChatHistories(newHistories);

      //最新のメッセージの位置まで自動スクロール
      endMessageRef.current?.scrollIntoView({ behavior: "auto" });
    });
  }, [chatHistories]);

  if (isLoading) return <Loading />;

  const onMessageSubmit = async (submitData: any) => {
    socket.emit("toServer", { ...submitData, roomId });
    reset();
  };

  return (
    <div className="flex min-h-screen w-full h-full sm:flex-row justify-end sm:justify-start items-start bg-white">
      <div className="flex-col fle"></div>
      {/* いろんな人とのやりとりリスト */}
      <div className="hidden min-h-screen h-full sm:flex sm:w-[24%] flex-col overflow-y-auto border border-r-gray-700 ">
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

      {/* スクリーンサイズ:sm未満で表示されるボタンとサイドバー (やりとりリストを表示) */}
      <button
        hidden={isRoomListOpen}
        onClick={() => setIsRoomListOpen(true)}
        className="sm:hidden absolute left-1 top-[64px] z-10 w-[46px] h-[44px] py-[6px] border border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2"
      >
        <div hidden={isRoomListOpen} className="w-[25px] text-gray-600">
          →
        </div>
      </button>
      <nav
        className={
          isRoomListOpen
            ? "absolute left-0 top-[60px] z-20 w-1/2 h-full overflow-auto bg-gray-100 rounded-sm font-lato text-lg font-bold duration-300"
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

      {/* 一対一のルーム */}
      <div className="sm:w-[76%] pb-[160px] pt-12 sm:pt-0 flex flex-col gap-[58px] overflow-y-auto">
        {chatHistories.map((chat: ChatMessage) => (
          <div
            key={`${String(chat.createdAt)}`}
            className={`w-1/2 min-w-[100%] xs:min-w-[80%] p-[16px] flex gap-[8px] ${
              sender?.id === chat.senderId ? "justify-end" : "justify-start"
            }`}
            style={
              sender?.id === chat.senderId
                ? { alignSelf: "end" }
                : { alignSelf: "start" }
            }
          >
            <PersonIcon
              originalIconImageSrc={chat.senderImage}
              originalIconImageAlt={`${chat.senderName}のアイコン`}
              originalIconClassName={`${
                sender?.id === chat.senderId ? "hidden" : ""
              } rounded-full border border-black w-[40px] h-[40px]`}
              defaultIconClassName={`${
                sender?.id === chat.senderId ? "hidden" : ""
              } rounded-full border border-black w-[40px] h-[40px] p-1`}
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
        <div ref={endMessageRef} />
      </div>
      {/* 送信フォーム */}
      <form
        className="fixed bottom-4 right-4 w-[90%] sm:w-3/5"
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
