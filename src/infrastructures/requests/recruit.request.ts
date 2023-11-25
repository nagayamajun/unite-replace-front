import { Recruit } from "@/domein/recruit";
import { axiosInstance } from "@/libs/axios"
import { CreateRecruitInputType } from "@/domein/recruit";

export const recruitRequest = {
  async search(search?: string): Promise<Recruit[]> { 
    const response = await axiosInstance.get(`/user-recruit`, { params: { search } });
    return response.data;
  },

  async getByRecruitId(id: string): Promise<Recruit> {
    const response = await axiosInstance.get(`/user-recruit/findOne/${id}`);
    return response.data;
  },

  async getByOwnLiked(): Promise<Recruit[]> {
    const response = await axiosInstance.get('/user-recruit/liked-recruits');
    return response.data;
  },

  async getOwn(): Promise<Recruit[]> {
    const response = await axiosInstance.get('/user-recruit/my-recruits');
    return response.data;
  },

  async getRelatedOwn(): Promise<Recruit[]> {
    const response = await axiosInstance.get('/user-recruit/related-recruits');
    return response.data;
  },

  async create(data: CreateRecruitInputType) {
    const response = await axiosInstance.post("/user-recruit", data);
    return response.data;
  },

  async delete(id: string) {
    await axiosInstance.delete(`/user-recruit/${id}`);
  },

  async edit({id, input}: {id: string, input: CreateRecruitInputType}) {
    await axiosInstance.put(`/user-recruit/${id}`, input);
  }
}

