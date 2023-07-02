import Link from "next/link";

type RecruitCardProps = {
  //userのidと企業側のid両方必要
  id: string;
  createdAt: Date;
  headline: string;
  programingSkills: string[];
  hackthonName?: string;
};

export const RecruitCard = ({
  id,
  createdAt,
  headline,
  programingSkills,
  hackthonName,
}: RecruitCardProps): JSX.Element => (
  <div
    className={`group relative mb-2 h-96 border overflow-hidden rounded-xl sm:mb-3 shadow-md min-w-[400px]`}
  >
    <div className="flex justify-center items-center h-2/5 bg-gradient-to-r from-recruite-card-bg to-pink-200">
      <p className="text-2xl sm:text-4xl font-bold text-white">
        {hackthonName ? hackthonName : headline}
      </p>
    </div>
    <div className="flex col">
      {programingSkills?.map((skill, index) => (
        <div key={index} className="flex flex-wrap justify-start line-clamp-1">
          <span className="text-gray-500 inline-flex items-center gap-1.5 py-1 px-2  mx-1 my-3  text-xs rounded-full border-2 border-gray-400 ">
            {skill}
          </span>
        </div>
      ))}
    </div>
    <div className="flex justify-center items-center h-1/3">
      <div className="flex flex-col">
        <h3 className="font-zen font-regular text-lg sm:text-2xl mx-3 sm:mx-10 line-clamp-1 text-gray-500">
          {headline}
        </h3>
      </div>
    </div>
    <div className="flex justify-between mb-3 ">
      <div className="w-2/3 flex col items-center">
        <p className="text-sm pl-8">
          {new Date(createdAt).toISOString().slice(0, 10)}
        </p>
      </div>
      <div className="w-1/3 flex flex-col justify-center items-center">
        <Link
          href={`/recruit/${id}/recruitDetail`}
          className=" text-green-800  rounded-lg focus:outline-none focus:border-transparent text-center bg-transparent text-sm sm:text-lg hover:bg-pink-300 hover:text-white p-3"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  </div>
);
