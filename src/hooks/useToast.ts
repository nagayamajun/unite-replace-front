import { ToastState } from "@/stores/toast";
import { Toast, ToastStyle } from "@/types/toast";
import { useRecoilState } from "recoil";

export const useToast = () => {
  const [ state, setState ] = useRecoilState<Toast>(ToastState);
  const showToast = ({message, style}: { message: string, style: ToastStyle }): void => {
    setState({...state, ...{isShown: true, message, style}});
  };
  const hideToast = (): void => {
    setState({...state, ...{isShown:false}})
  }

  return { showToast, hideToast }
};