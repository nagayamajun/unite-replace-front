import { CreateRecruitInputType, Recruit } from "@/domein/recruit";

export interface RecruitService {
  searchRecruit(search?: string): Promise<Recruit>;
  create(data: CreateRecruitInputType): Promise<{id: string}>
}