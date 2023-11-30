import { useRecruit } from "@/adapters/recruit.adapter";

// SSRなのでコンポーネント上でエラーハンドリング
export const SearchRecruits = () => {
  const recruit = useRecruit();

  const getSearchRecruits = async (search?: string) => {
    try {
      const recruits = await recruit.searchRecruit(search);
      return { recruits };
    } catch (error) {
      throw error;
    }
  }

  return {
    getSearchRecruits
  }
}