import { NoticeService } from "@/application/ports/noticeService";
import { noticeService } from "@/infrastructures/frameworks/toast";

export const useNotice = (): NoticeService => {
  return {
    info(title) {
      return noticeService.info(title)
    },
    warn(title) {
      return noticeService.warn(title)
    },
    success(title) {
      return noticeService.success(title)
    },
    error(title) {
      return noticeService.error(title)
    },
  }
}