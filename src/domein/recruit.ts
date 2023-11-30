import { ProgrammingSkill } from "@/features/user/types/programingSkill";
import { User } from "./user";
import { UserRecruitParticipant } from "./recruitParticipant";
import * as z from 'zod'

// TODO: Productの設計を変更したらこちらも変える
import { Product } from "@/features/product/types/product";
import { UserToRecruitLike } from "@/features/recruit/types/userToRecruitLike";
import { INVALID_DATE_MESSAGE, REQUIRE_FIELD } from "@/constants/constants";

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

export type SearchRecruitInputType = z.infer<typeof SearchRecruitInput>;
export const SearchRecruitInput = z.object({
  search: z.string().optional()
})

export type CreateRecruitInputType = z.infer<typeof CreateRecruitInput>;
export const CreateRecruitInput = z.object({
  headline: z.string().min(1, REQUIRE_FIELD),
  details: z.string().min(1, REQUIRE_FIELD),
  hackathonUrl: z.string().min(1, REQUIRE_FIELD),
  hackathonName: z.string().min(1, REQUIRE_FIELD),
  numberOfApplicants: z.union([z.number(), z.string()]),
  programingSkills: z.array(z.string().min(1, REQUIRE_FIELD)),
  developmentStartDate: z.string().refine(
    (value: string) => { 
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, INVALID_DATE_MESSAGE
  ),
  developmentEndDate: z.string().refine(
    (value: string) => { 
      const date = new Date(value);
      return !isNaN(date.getTime());
    }, INVALID_DATE_MESSAGE
  ),
})