import { UserState } from "@/stores/atoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useCertainUser } from "@/application/usecases/getCertainUser";

import { LogOutButton } from "./LogOutButton";
import { EditUserInfo } from "./EditUserInfo";
import { MyRecruitList } from "./MyRecruitList";
import { ScoutButton } from "./ScoutButton";
import { useGetMyAndRelatedRecruits } from "@/application/usecases/getMyAndRelatedRecruits";
import { useUserLogOut } from "@/application/usecases/userLogOut";

export const UserProfile = (): JSX.Element => {
  const router = useRouter();
  const { id: userId } = router.query;

  //操作userとプロフィール主userの情報取得
  const [operatorUser, setMyselfState] = useRecoilState(UserState);
  const isMyself = operatorUser?.id === userId;

  const {
    certainUser: profileUser,
    setCertainUser: setProfileUser,
  } = useCertainUser(userId as string | undefined);
  const { relatedRecruits, myRecruits } = useGetMyAndRelatedRecruits();

  const { userLogOut } = useUserLogOut();

  const handleLogOut = async (): Promise<void> => {
    const isSuccess = await userLogOut();
    if (isSuccess) {
      setMyselfState(null);
      router.push('/signIn')
    };
  }

  if (!profileUser) return <></>;

  return (
    <div className="flex flex-col items-center justify-center gap-y-28 text-[16px] pb-20 w-full">
      <div className="flex flex-col items-center gap-24 w-4/5 sm:w-sm md:w-md lg:w-lg rounded-md">
        {/* ログアウトボタン */}
        <LogOutButton
          handleLogOut={handleLogOut}
          isMyself={isMyself}
        />
        
        {/* プロフィール */}
        <EditUserInfo 
          setMyselfState={setMyselfState}
          isMyself={isMyself}
          profileUser={profileUser}
          setProfileUser={setProfileUser}
        />
        
        {/* 操作ユーザーがプロフィール主の場合のみ以下を表示 */}
        <MyRecruitList
          isMyself={isMyself}
          profileUser={profileUser}
          recruitsByRecruiterId={myRecruits}
          relatedRecruits={relatedRecruits}
        />

        {/* スカウトボタン */}
        <ScoutButton />
      </div>
    </div>
  );
};
