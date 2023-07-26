import { User } from "../../user/types/user";

export type UserRecruitParticipant = {
  id: string;
  userId: string;
  userRecruitId: string;
  isApproved: boolean;
  user: User
}