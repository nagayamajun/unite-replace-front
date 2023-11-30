export type ChatRoom = {
  id: string;
  interlocutorName?: string;
  interlocutorImageUrl?: string;
  latestMessage?: string;
  lastDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};
