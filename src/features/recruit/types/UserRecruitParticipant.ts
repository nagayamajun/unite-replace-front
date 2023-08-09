import { User } from "../../user/types/user";
import { Recruit } from "./recruit";

export type UserRecruitParticipant = {
  id: string;
  userId: string;
  userRecruitId: string;
  isApproved: boolean;
  user: User;
  recruit: Recruit;
};
