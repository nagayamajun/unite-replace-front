import { ProgrammingSkill } from "@/features/user/types/programingSkill";
import { User } from "./user";
import { UserRecruitParticipant } from "./recruitParticipant";
import * as z from 'zod'

// TODO: Productの設計を変更したらこちらも変える
import { Product } from "@/features/product/types/product";
import { UserToRecruitLike } from "@/features/recruit/types/userToRecruitLike";

type DateTimeString = string;

export type Recruit = {
  id: string;
  headline: string;
  details: string;
  hackathonUrl: string
  hackathonName: string;
  numberOfApplicants: number;
  programingSkills: ProgrammingSkill[];
  developmentStartDate: DateTimeString;
  developmentEndDate: DateTimeString;
  createdAt: Date;
  updatedAt?: Date;

  recruiter?: User;
  applications?: User[];
  userRecruitParticipant?: UserRecruitParticipant[];
  product: Product[];
  userToRecruitLikes?: UserToRecruitLike[]
}



export const SearchRecruitInput = z.object({
  search: z.string().optional()
})
export type SearchRecruitInputType = z.infer<typeof SearchRecruitInput>;