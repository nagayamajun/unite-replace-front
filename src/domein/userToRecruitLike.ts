import { Recruit } from "./recruit"
import { User } from "./user"

export type UserToRecruitLike = {
  id: string
  userId: string,
  recruitId: string,
  user: User
  recruit: Recruit
}