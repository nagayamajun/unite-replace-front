import { GlobalLoadingService, GlobalUserService } from "@/application/ports/globalStateService"
import { useRecoilLoading, useRecoilUser } from "@/infrastructures/frameworks/store";

export const useGlobalUser = (): GlobalUserService => {
  const { user, setUser } = useRecoilUser();
  return {
    setUser(user) {
        return setUser(user)
    },
    user: user
  }
}

export const useGlobalLoading = (): GlobalLoadingService => {
  const { showLoading, hideLoading } = useRecoilLoading();
  return {
    showLoading() {
        return showLoading();
    },
    hideLoading() {
        return hideLoading()
    },
  }
}