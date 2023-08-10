import { Comment } from "./comment";
import { EmployeeProductLike } from "./employeeToProductLike";
import { Recruit } from "../../recruit/types/recruit";
import { UserRecruitParticipant } from "@/features/recruit/types/UserRecruitParticipant";
import { ProgrammingSkill } from "@/features/user/types/programingSkill";

export type Product = {
  id: string;
  name: string;
  skills: ProgrammingSkill[];
  reasonForSkillSelection: string;
  developmentBackground: string;
  overview: string;
  url: string;
  recruitId: string;
  comment?: Comment[];
  recruit?: Recruit;
  createdAt: Date;
  updatedAt?: Date;
  employeeToProductLikes?: EmployeeProductLike[];
};

export type ProductWithApprovedUserRecruitParticipants = Product & {
  approvedUserRecruitParticipants: UserRecruitParticipant[];
};

export enum PathToProductPage {
  CorporationPath,
  UserPath,
}
