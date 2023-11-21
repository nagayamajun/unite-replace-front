import { useNotice } from "@/adapters/notice.adapter"
import { useRecruit } from "@/adapters/recruit.adapter";


export const getRecruitById = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const recruitService = useRecruit();

  const getRecruit = async(id: string) => {
    try {
      const recruit = await recruitService.getByRecruitId(id);
      return { recruit }
    } catch (error) {
      throw error
    }
  }

  return {
    getRecruit
  }
}