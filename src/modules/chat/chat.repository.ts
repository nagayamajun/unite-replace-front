import { realTimeDb } from "@/libs/firebase";
import { push, ref, serverTimestamp, set } from "firebase/database";
import { CorporationRepositry } from "../corporation/corporation.repository";

import { UserRepository } from "../user/user.repository";
import { axiosInstance } from "@/libs/axios";
import { errorSelector } from "recoil";

export const ChatRepository = {
  async findOneRoomHistory(roomId: string): Promise<any> {
    const res = await axiosInstance
      .get(`/chat-room-message/${roomId}`)
      .catch((error) => {
        throw new Error(error);
      });
    return res.data;
  },

  async findManyRooms(roomIds: string[], senderUid: string): Promise<any> {
    const resRoomHistories = await Promise.all(
      roomIds.map(async (roomId) => {
        const opponentUid = roomId.split("*").find((uid) => uid !== senderUid);
        if (!opponentUid) throw new Error("相手がいない");
        const opponentUser = await UserRepository.findOneByUid(opponentUid);
        const opponentCorporation = await CorporationRepositry.findOneByUid(
          opponentUid
        );
        const res = {
          roomId: roomId,
          opponentName:
            opponentUser?.name ?? opponentCorporation?.corporation_name,
        };
        /**
         * 最新のメッセージも表示したいってなったら、これ以降も実装したい
        onValue(ref(realTimeDb, roomId), (snapShot) => {
          let opponentCount = 0;
          console.log(snapShot);
          console.log(snapShot.val());
          snapShot.forEach((childSnapShot) => {
            console.log(childSnapShot);
            const post = childSnapShot.val();
            if (post.senderUid !== senderUid && opponentCount < 1) {
              res.opponentName = post.senderName;
              opponentCount++;
            }
          });
        });
         */
        return res;
      })
    );

    return resRoomHistories;
  },

  async post(
    senderUid: any,
    senderName: string,
    roomId: string,
    message: string
  ) {
    const postListRef = ref(realTimeDb, roomId);
    const newPostRef = push(postListRef);
    await set(newPostRef, {
      senderUid,
      senderName,
      message,
      timestamp: serverTimestamp(),
    }).catch((err) => {
      throw new Error("メッセージ送信失敗");
    });
  },
};
