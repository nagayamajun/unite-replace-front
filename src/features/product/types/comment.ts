import { User } from "../../user/types/user"

export type Comment = {
  id: string,
  userId: string
  productId: string
  content: string,
  createdAt: Date
  updatedAt: Date
  user: User
}
