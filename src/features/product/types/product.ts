import { Comment } from "./comment"
import { EmployeeProductLike } from "./employeeToProductLike"
import { Recruit } from "../../recruit/types/recruit"
import { ProgramingSkill } from "@/features/user/types/programingSkill"

export type Product = {
  id: string,
  name: string,
  skills: ProgramingSkill[];
  reasonForSkillSelection: string;
  developmentBackground: string;
  overview: string
  url: string
  comment?: Comment[]
  recruit?: Recruit
  createdAt: Date,
  updatedAt?: Date,
  employeeToProductLikes?: EmployeeProductLike[]
}

export enum PathToProductPage {
  CorporationPath,
  UserPath,
}



