import { PersonIcon } from "@/components/molecules/Icon/PersonIcon";
import { User } from "@/features/user/types/user";
import Link from "next/link";

type RecruitCardProps = {
  //userのidと企業側のid両方必要
  id: string;
  createdAt: Date;
  headline: string;
  programingSkills: string[];
  hackthonName?: string;
  recruiter?: User
};

export const RecruitCard = ({
  id,
  createdAt,
  headline,
  programingSkills,
  hackthonName,
  recruiter
}: RecruitCardProps): JSX.Element => (
  <div
    className={`group relative px-6 py-8 mb-2 sm:mb-3 h-auto bg-white border overflow-hidden rounded-xl shadow-md sm:min-w-[400px] max-w-[560px]  flex flex-col justify-start gap-4`}
  >
    {/* ハッカソン名 */}
    <div className="flex flex-col">
      <p className="text-sm">ハッカソン名(チーム名)</p>
      <p className="text-xl sm:text-2xl font-semibold text-black">
          {hackthonName ? hackthonName : headline}
      </p>
    </div>
    {/* ひとこと */}
    <div className="flex flex-col ">
      <p className="text-sm">ひとこと</p>
      <div className="flex flex-col">
        <h3 className="text-lg sm:text-xl line-clamp-1 ">
          {headline}
        </h3>
      </div>
    </div>
    {/* 募集スキル */}
    <div className="flex flex-col">
      <p className="text-sm">募集スキル</p>
      <div className="flex col">
        {programingSkills?.map((skill, index) => (
          <div key={index} className="flex flex-wrap justify-start line-clamp-1">
            <span className="text-gray-500 inline-flex items-center gap-1.5 py-1 px-2  mx-1 my-3  text-sm rounded-full border-2 border-gray-500 ">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="flex justify-between">
      <div className=" flex col items-center">
        <p className="text-sm mr-3 mb-2 sm:mb-0 sm:text-base">募集主: {recruiter?.name}</p>
        <PersonIcon 
          originalIconImageSrc={recruiter?.imageUrl}
        />
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center">
        <Link
          href={`/recruit/${id}/recruitDetail`}
          className=" text-green-800  rounded-lg focus:outline-none focus:border-transparent text-center bg-transparent text-sm sm:text-lg p-3"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  </div>
);
