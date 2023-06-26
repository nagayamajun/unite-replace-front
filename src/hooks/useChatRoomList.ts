import { ChatRoomRepository } from "@/modules/chatRoom/chatRoom.repository";
import { ChatRoom } from "@/types/chatRoom";
import { useEffect, useState } from "react";

export const useChatRoomList = () => {
  const [roomList, setRoomList] = useState<ChatRoom[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedRooms = await ChatRoomRepository.findMany();
      setRoomList(fetchedRooms);
    })();
  }, []);

  return roomList;
};
