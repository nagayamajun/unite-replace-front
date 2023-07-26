import { Comment } from "./comment"
import { EmployeeProductLike } from "./employeeToProductLike"
import { Recruit } from "../../recruit/types/recruit"

export type Product = {
  id: string,
  headline: string,
  url: string
  detail: string,
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