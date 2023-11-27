export interface NoticeService {
  info: (title: string) => void;
  warn: (title: string) => void;
  success: (title?: string) => void;
  error: (title?: string) => void;
};