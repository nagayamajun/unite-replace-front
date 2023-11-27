export type ChatMessage = {
  id: string;
  content: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderImage: string;
  createdAt: Date;
  updatedAt: Date;
};
