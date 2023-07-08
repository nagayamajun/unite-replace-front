import { CorporationState } from "@/global-states/corporateAtom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { PersonIcon } from "../atoms/PersonIcon";
import { PiChatCircleDotsThin } from "react-icons/pi";

export const CorporateHeaderLine = (): JSX.Element => {
  const router = useRouter();
  const corporationStateVal = useRecoilValue(CorporationState);
  const [arbitraryRoomId, setArbitraryRoomId] = useState<string>();

  useEffect(() => {
    if (corporationStateVal?.room_ids) {
      setArbitraryRoomId(corporationStateVal.room_ids[0]);
    }
  }, [corporationStateVal?.uid]);

  return (
    <div className="mx-auto">
      <header className="border-b border-black/20 pt-5 w-full">
        <div className="font-caveat mx-auto flex items-center justify-between">
          <Link href="/corporation">
            <p className="text-5xl pl-10">UNITE</p>
          </Link>
          <div className="flex mr-[4%]">
            <Link href={`/corporation/chat/${arbitraryRoomId}`}>
              <PiChatCircleDotsThin size={36} />
            </Link>
            <Link href="#">
              <PersonIcon />
            </Link>
          </div>
        </div>
      </header>
      <div className="flex justify-center -mt-16">
        <Image src="/cat.gif" alt="Logo" width={70} height={70} />
      </div>
      <header className="border-b border-black/20 w-full">
        <div className="font-caveat mx-auto flex text-xl">
          <div className="flex-1 pl-5">
            <Link href="/corporation">ユーザー一覧</Link>
          </div>
          <div className="flex-1 border-l border-black/20 pl-5">
            <Link href="/corporation/productList">プロダクト一覧</Link>
          </div>
          <div className="flex-1 flex border-l border-black/20 pl-5">
            <Link href="#">Comming soon..</Link>
          </div>
        </div>
      </header>
    </div>
  );
};
