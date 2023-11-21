import { UserState, UserStateType } from "@/stores/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useCertainUser } from "@/hooks/useCertainUser";

import { LogOutButton } from "../../../features/user/components/molecules/LogOutButton";
import { EditUserInfo } from "./EditUserInfo/inedx";
import { MyRecruitList } from "../../../features/user/components/organisms/List/MyRecruitList";
import { ScoutButton } from "../../../features/user/components/molecules/ScoutButton";

export const UserProfile = (): JSX.Element => {
  const router = useRouter();
  const { id: userId } = router.query;

  //操作userとプロフィール主userの情報取得
  const operatorUser = useRecoilValue<UserStateType>(UserState);
  const isMyself = operatorUser?.id === userId;
  const setMyselfState = useSetRecoilState<UserStateType>(UserState);
  const {
    certainUser: profileUser,
    setCertainUser: setProfileUser,
    error,
  } = useCertainUser(userId as string | undefined);
  if (!profileUser) return <></>;

  return (
    <div className="flex flex-col items-center justify-center gap-y-28 text-[16px] pb-20 w-full">
      <div className="flex flex-col items-center gap-24 w-4/5 sm:w-sm md:w-md lg:w-lg rounded-md">
        {/* ログアウトボタン */}
        <LogOutButton
          setMyselfState={setMyselfState}
          isMyself={isMyself}
        />
        
        {/* プロフィール */}
        <EditUserInfo 
          setMyselfState={setMyselfState}
          isMyself={isMyself}
          profileUser={profileUser}
          setProfileUser={setProfileUser}
          error={error}
        />
        
        {/* 操作ユーザーがプロフィール主の場合のみ以下を表示 */}
        <MyRecruitList
          isMyself={isMyself}
          profileUser={profileUser}
        />

        {/* スカウトボタン */}
        <ScoutButton />
      </div>
    </div>
  );
};
