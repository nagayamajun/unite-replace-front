import { PersonIcon } from "@/components/molecules/Icon/PersonIcon";
import { ChatRepository } from "@/features/chat/modules/chat/chat.repository";
import { ChatRoomParticipantRepository } from "@/features/chat/modules/chatRoomParticipant/chatRoomParticipant.repository";
import { ChatMessage } from "@/features/chat/types/chatMessage";
import { ChatParticipant } from "@/features/chat/types/chatParticipant";
import { isoToJstString } from "@/utils/date";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
  roomId: string
  socket: Socket;
}

export const OneToOneChatRoom = ({ roomId, socket }: Props): JSX.Element => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  //チャット履歴を管理するstate
  const [chatHistories, setChatHistories] = useState<ChatMessage[]>([]);
  //メッセージを送る主体 (ログインユーザー)
  const [sender, setSender] = useState<ChatParticipant>();
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

  return (
    <div className="md:w-[76%] pb-[160px] pt-12 md:pt-0 flex flex-col gap-[58px] overflow-y-auto">
      {chatHistories.map((chat: ChatMessage) => (
        <div
          key={`${String(chat.createdAt)}`}
          className={`max-w-[100%] xs:min-w-[80%] p-[16px] flex gap-[8px] ${
            sender?.id === chat.senderId
              ? "justify-end ml-8"
              : "justify-start mr-8"
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
            } rounded-full border border-black min-w-[40px] min-h-[40px] p-1`}
          />
          <div className="max-w-full bg-white rounded-xl flex-col gap-[8px]">
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
                className={`p-[8px] rounded-xl text-[16px] w-full whitespace-normal break-words ${
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
  )
}