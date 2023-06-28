import { UserRecruitParticipant } from "./UserRecruitParticipant";
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
  userRecruitParticipant?: UserRecruitParticipant[];
  product: Product[] //BEで配列になっているため1対1の関係だが配列で受け取る必要がある
}

//リファクタ
//productとuserRecruitParticipantの型付けをする。