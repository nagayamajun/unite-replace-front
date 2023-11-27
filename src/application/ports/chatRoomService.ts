import { ChatRoom } from "@/domein/chatRoom";

export interface ChatRoomService {
  findMany: () =>  Promise<ChatRoom[]>;
};