import { Comment } from "./comment";
import { EmployeeProductLike } from "./employeeToProductLike";
import { Recruit } from "../../recruit/types/recruit";
import { UserRecruitParticipant } from "@/features/recruit/types/UserRecruitParticipant";

export type Product = {
  id: string;
  headline: string;
  url: string;
  detail: string;
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
