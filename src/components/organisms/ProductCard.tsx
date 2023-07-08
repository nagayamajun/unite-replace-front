import { FieldValue } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { PersonIcon } from "../atoms/PersonIcon";
import { useRecoilValue } from "recoil";
import { UserState, UserStateType } from "@/global-states/atoms";

type Props = {
  genre: string;
  detailInfo: string;
  filePath: string;
  user_id: string;
  createDate: FieldValue;
};
export const ProductCard = ({
  genre,
  detailInfo,
  filePath,
  user_id,
  createDate,
}: Props) => {
  const myself = useRecoilValue<UserStateType>(UserState);

  return (
    <>
      <div className="group group relative mb-2 h-full w-100 border overflow-hidden rounded-3xl bg-white lg:mb-3 font-caveat">
        <div className="flex justify-center">
          <PersonIcon
            originalIconImageSrc={myself?.imageUrl}
            originalIconImageAlt={`${myself?.name}のアイコン`}
          />
        </div>
        <div className="flex flex-col justify-center ">
          <p className="m-auto p-1">{genre ? `種類: ${genre}` : "No Genre"}</p>
          <p className="m-auto p-1">
            {detailInfo ? `詳細: ${detailInfo}` : "No DetailInfo"}
          </p>
          <Link href={filePath} className="flex justify-center">
            <p className="table bg-green-50 rounded-lg p-3">
              完成品の動画/画像リンク取得
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};
