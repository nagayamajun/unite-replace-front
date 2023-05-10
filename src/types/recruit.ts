import { ProgramingSkill } from "./programingSkill";

export type Recruit = {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  headline: string;
  details: string;
  programingSkills: ProgramingSkill[];
  developmentPeriod: string;
  hackathonUrl: string;
  numberOfApplicants: number;
  hackthonName?: string;
}
