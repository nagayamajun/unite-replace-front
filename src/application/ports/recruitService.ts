import { CreateRecruitInputType, Recruit } from "@/domein/recruit";

export interface RecruitService {
  searchRecruit(search?: string): Promise<Recruit[]>;
  create(data: CreateRecruitInputType): Promise<{id: string}>
  getByRecruitId(id: string): Promise<Recruit>;
  getByOwnLiked(): Promise<Recruit[]>;
  getOwn(): Promise<Recruit[]>;
  getRelatedOwn(): Promise<Recruit[]>;
  delete(id: string): Promise<void>;
  edit({id, input}: {id: string, input: CreateRecruitInputType}): Promise<void>;
}