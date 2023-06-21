import { Product } from "./product";
import { ProgramingSkill } from "./programingSkill";
import { User } from "./user";

export type Recruit = {
  id: string;
  recruiter?: User;
  createdAt: Date;
  updatedAt?: Date;
  headline: string;
  details: string;
  programingSkills: ProgramingSkill[];
  developmentPeriod: string;
  hackathonUrl: string;
  hackthonName?: string;
  numberOfApplicants: number;
  applications?: User[]
  userRecruitParticipant?: any[];
  product: Product
}

//リファクタ
//productとuserRecruitParticipantの型付けをする。