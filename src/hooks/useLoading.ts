import { LoadingState } from "@/stores/loading";
import { Loading } from "@/types/loading";
import { useRecoilState } from "recoil";

export const useLoading = () => {
  const [state, setState] = useRecoilState<Loading>(LoadingState);
  const showLoading = (): void => {
    setState({ ...state, ...{ isLoading: true } });
  };
  const hideLoading = (): void => {
    setState({ ...state, ...{ isLoading: false } });
  };
  return { showLoading, hideLoading };
};