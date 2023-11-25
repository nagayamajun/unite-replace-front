import { INVALID_DATE_MESSAGE, REQUIRE_FIELD } from '@/constants/constants';
import * as z from 'zod';

export type User = {
  id: string;
  // firebaseUID: string;
  name?: string;                      
  imageUrl?: string;
  age?: string;
  prefecture?: string;
  university?: string;
  undergraduate?: string;
  graduateYear?: string;
  selfPublicity?: string; //自己紹介
  careerVision?: string;
  developmentExperience?: boolean;
  internshipExperience?: boolean;
  githubAccount?: string;
  programingSkills?: string[];
};

export type UserInputType = z.infer<typeof UserInput>;
export const UserInput = z.object({
  name: z.string().min(1, REQUIRE_FIELD),
  age: z.string().min(1, REQUIRE_FIELD),
  prefecture: z.string().min(1, REQUIRE_FIELD),
  university: z.string().min(1, REQUIRE_FIELD),
  undergraduate: z.string().min(1, REQUIRE_FIELD),
  selfPublicity: z.string().min(1, REQUIRE_FIELD),
  careerVision: z.string().min(1, REQUIRE_FIELD),
  graduateYear: z.string().min(1, REQUIRE_FIELD),
});

export type CreateRecruitInputType = z.infer<typeof CreateRecruitInput>;
export const CreateRecruitInput = z.object({
  name: z.string().min(1, REQUIRE_FIELD),
  age: z.string().min(1, REQUIRE_FIELD),
  prefecture: z.string().min(1, REQUIRE_FIELD),
  university: z.string().min(1, REQUIRE_FIELD),
  undergraduate: z.string().min(1, REQUIRE_FIELD),
  selfPublicity: z.string().min(1, REQUIRE_FIELD),
  careerVision: z.string().min(1, REQUIRE_FIELD),
  graduateYear: z.string().min(1, REQUIRE_FIELD),

  imageUrl: z.string().min(1, REQUIRE_FIELD),
  programingSkills: z.array(z.string().min(1, REQUIRE_FIELD)),
  numberOfApplicants: z.union([z.number(), z.string()]),

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