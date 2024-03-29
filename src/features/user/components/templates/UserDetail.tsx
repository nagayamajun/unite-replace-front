import { APPLY_FIRST_MESSAGE } from "@/constants/constants";
import { ChatRepository } from "@/features/chat/modules/chat/chat.repository";
import { CorporationRepository } from "@/features/corporation/modules/corporation/corporation.repository";
import { UserRepository } from "@/features/user/modules/user/user.repository";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { User } from "../../types/user";
import { Loading } from "../../../../components/organisms/Loading/Loading";
import { EmployeeState } from "@/stores/employeeAtom";

export const UserDetailPage = (): JSX.Element => {
  const router = useRouter();
  const { uid } = router.query;
  const corporationStateVal = useRecoilValue(EmployeeState);
  const [corporationState, setCorporationState] = useRecoilState(EmployeeState);
  const [user, setUser] = useState<User>();

  // useEffect(() => {
  //   (async () => {
  //     const user = await UserRepository.find(uid);
  //     setUser(user);
  //   })();
  // }, [uid]);


  // const applyFor = async () => {
  //   if (!corporationStateVal?.uid || !corporationStateVal?.corporation_name)
  //     throw new Error("CorporationStateのuidかnameが空");
  //   const roomId = `${corporationStateVal?.uid}*${user.uid}`;

  //   // この辺の処理はrepositoryとかserviceに切り出したい
  //   await ChatRepository.post(
  //     corporationStateVal.uid,
  //     corporationStateVal.corporation_name,
  //     roomId,
  //     APPLY_FIRST_MESSAGE
  //   );
  //   await CorporationRepository.update(corporationStateVal?.uid, {
  //     ...corporationStateVal,
  //     room_ids: corporationStateVal.room_ids
  //       ? [...corporationStateVal.room_ids, roomId]
  //       : [roomId],
  //   });
  //   // if (!recruitUser) throw new Error("recruitUserなし");
  //   await UserRepository.update(user.uid, {
  //     ...user,
  //     room_ids: user.room_ids ? [...user.room_ids, roomId] : [roomId],
  //   });
  //   setCorporationState((prev: any): any => {
  //     return {
  //       ...prev,
  //       room_ids: prev?.room_ids ? [...prev.room_ids, roomId] : [roomId],
  //     };
  //   });
  //   router.push(`/corporation/chat/${roomId}`);
  // };

  return (
    <div className="flex justify-center w-full my-5">
      {/* <div className="flex-col w-3/5 justify-center mt-10 rounded-lg bg-white">
        <div className="text-center text-2xl my-5">
          <p className="mb-2">名前</p>
          <p className="">{user?.name}</p>
        </div>
        <div className="text-center text-2xl mb-5">
          <p className="mb-2">大学・専門</p>
          <p>{user?.university}</p>
        </div>
        <div className="text-center text-2xl mb-5">
          <p className="mb-2">卒業予定度</p>
          <p>{user?.graduateYear}</p>
        </div>
        <div className="text-center text-2xl mb-5">
          <p className="mb-2">githubアカウント</p>
          <p>{user?.github}</p>
        </div>
        <div className="text-center text-2xl mb-5">
          <p className="mb-2">プログラミングスキル</p>
          <div className="flex justify-center mx-10">
            {user?.programingSkills?.map((skill) => (
              <p key={skill} className="bg-red-50 ml-2 table rounded-lg p-1">
                {skill}
              </p>
            ))}
          </div>
        </div>
        <div className="flex m-4 justify-between">
          <button
            className="p-4 table rounded-2xl ml-5 bg-green-50"
            onClick={applyFor}
          >
            話を聞きたい
          </button>
          <button
            onClick={() => router.back()}
            className="bg-green-50 p-4 table rounded-2xl mr-5"
          >
            戻る
          </button>
        </div>
      </div> */}
    </div>
  );
};
//
