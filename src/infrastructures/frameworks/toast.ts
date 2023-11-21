import { toast } from "react-toastify";

export const noticeService = ({
  info: (title: string) => toast.info(title),
  warn: (title: string) => toast.warn(title),
  success: (title?: string) => toast.success(title ?? '成功しました'),
  error: (title?: string) => toast.error(title ?? '失敗しました'),
});

