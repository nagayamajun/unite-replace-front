export type ToastStyle = 'success' | 'failed'

export type Toast = {
  isShown: boolean;
  message: string;
  style: ToastStyle;
}