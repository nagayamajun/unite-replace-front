import { UserRecruitParticipant } from "./UserRecruitParticipant";
import { Product } from "../../product/types/product";
import { ProgrammingSkill } from "../../user/types/programingSkill";
import { User } from "../../user/types/user";
import { UserToRecruitLike } from "./userToRecruitLike";

export type Recruit = {
  id: string;
  recruiter?: User;
  createdAt: Date;
  updatedAt?: Date;
  headline: string;
  details: string;
  programingSkills: ProgrammingSkill[];
  developmentPeriod: string;
  hackathonUrl: string;
  hackthonName?: string;
  numberOfApplicants: number;
  applications?: User[]
  userRecruitParticipant?: UserRecruitParticipant[];
  product: Product[] //BEで配列になっているため1対1の関係だが配列で受け取る必要がある
  userToRecruitLikes?: UserToRecruitLike[]
}

export type FormRecruitData = {
  hackthonName: string;
  headline: string;
  details: string;
  programingSkills: ProgrammingSkill[];
  developmentPeriod: string;
  hackathonUrl: String;
  numberOfApplicants: number; //募集人数
};