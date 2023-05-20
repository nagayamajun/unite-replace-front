import { Header } from "@/components/organisms/Header";
import { Recruit } from "@/types/recruit";
import Link from "next/link";
import { useRouter } from "next/router"
import React from "react";



//recruitの中身
//   id: string;
//   createdAt: Date;
//   updatedAt?: Date;
  //   headline: string;
  //   details: string;
  //   programingSkills: ProgramingSkill[];
  //   developmentPeriod: string;
  //   hackathonUrl: string;
//   numberOfApplicants: number;
  //   hackthonName?: string;
  type Props = {
    recruit: Recruit
  }

  // const programingSkills = ["Flutter", "JavaScript", "TypeScript", "Next.js", "ruby", "rails"]

export const RecruitDetail: React.FC<Props> = ({ recruit })  => {
  let  { id, createdAt, updatedAt, headline, details, programingSkills ,hackthonName, developmentPeriod, hackathonUrl, numberOfApplicants } = recruit;

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-col justify-center items-center h-full text-white bg-gray-100">
        <div className="flex flex-col items-center w-9/12 h-3/4 rounded-md bg-gradient-to-r from-green-300 to-pink-300 ">
          <div className="flex flex-col w-full h-full">
            <div className="h-1/4 flex flex-col justify-center items-center">
              {/* ハッカソン名 */}
              <h1 className="text-4xl font-bold mt-5 text-center">{hackthonName}</h1>
              {/* headline */}
              <p className="text-xl mt-2 text-center">{headline}</p>
            </div>
            {/* プログラミングスキル */}
            <div className="h-1/5 flex justify-center items-center">
              {programingSkills?.map(skill => {
                return (
                  <div key={skill} className="bg-white text-gray-400 mx-2 p-2 rounded-md">{skill}</div>
                )
              })}
            </div>
            <div className="h-1/5">
              {/* 募集の詳細 */}
              <p className="mt-5 mx-5 leading-snug border border-white p-1 rounded-md ">{details}</p>
            </div>
            <div className="flex flex-row justify-between h-1/5">
              <div className="w-1/3">
                <p className="text-sm">・hackthon URL</p>
                <Link href={"/"}>{hackathonUrl}</Link>
              </div>
              <div className="w-1/3">
                <p className="text-sm">・開発期間</p>
                <p>{developmentPeriod}</p>
              </div>
            </div>

            <div className="flex flex-row justify justify-between w-full">
              <div className="ml-5">
                <p className="text-sm">募集人数</p>
                <p>{numberOfApplicants}</p>
              </div>
              <div className="w-1/2 flex justify-end mr-5">
                <Link href={"/"} className="bg-green-300 p-3 rounded-md">話を聞く</Link>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-row justify-between w-full items-end">
              <div className="w-1/2 ml-5 ">
                <p className="text-sm">募集人数</p>
                <p>{numberOfApplicants}</p>
              </div>
              <div className="w-1/2 flex justify-end mr-5">
                <Link href={"/"} className="bg-green-300 p-3 rounded-md">話を聞く</Link>
              </div>
            </div> */}
        </div>
      </div>
    </div>
  )
}

