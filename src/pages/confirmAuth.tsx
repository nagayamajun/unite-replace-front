import { Loading } from "@/components/templetes/common/Loading";
import { UserState } from "@/global-states/atoms";
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

const ConfirmAuth = () => {
  const router = useRouter()
  const user = useAuth();
  

  if (user) {
    router.push("/homeScreen");
  } else {
    return <Loading />
  }

}

export default ConfirmAuth
