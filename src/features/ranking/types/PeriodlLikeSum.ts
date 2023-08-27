import { Product } from "@/features/product/types/product"

export type  PeriodLikeSum = {
  id: string
  productId: string
  likesCount: number
  createdAt: Date
  product: Product
}
