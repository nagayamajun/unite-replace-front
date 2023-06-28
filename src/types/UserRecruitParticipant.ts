import { User } from "./user";

export type UserRecruitParticipant = {
  id: string;
  userId: string;
  userRecruitId: string;
  isApproved: boolean;
  user: User
}