import { Comment } from "./comment"
import { Recruit } from "./recruit"

export type Product = {
  id: string,
  headline: string,
  url: string //firesotreに保存したfileのurl
  detail: string,
  comment?: Comment[]
  recruit?: Recruit
  createdAt: Date,
  updatedAt?: Date
}
