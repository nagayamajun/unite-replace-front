import { Recruit } from "@/domein/recruit";
import { User } from "@/domein/user";



export type UserRecruitParticipant = {
  id: string;
  userId: string;
  userRecruitId: string;
  isApproved: boolean;
  user: User;
  recruit: Recruit;
};
