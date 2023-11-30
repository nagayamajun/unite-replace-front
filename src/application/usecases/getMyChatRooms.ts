import { useChatRoom } from "@/adapters/chatRoom.adapter";
import { useNotice } from "@/adapters/notice.adapter";
import { ChatRoom } from "@/domein/chatRoom";
import { useEffect, useState } from "react";

export const useMyChatRooms = () => {
  const noticeService = useNotice();
  const [roomList, setRoomList] = useState<ChatRoom[]>([]);
  const chatRoomService = useChatRoom();

  useEffect(() => {
    (async () => {
      try {
        const response = await chatRoomService.findMany();
        setRoomList(response);
      } catch (error: unknown) {
        const isTypeSafeError = error instanceof Error;
        noticeService.error(`取得に失敗しました。${isTypeSafeError && error.message}`)
      }
    })();
  }, []);

  return { roomList };
};
