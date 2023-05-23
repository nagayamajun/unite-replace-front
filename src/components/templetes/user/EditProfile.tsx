import { UserState, UserStateType } from "@/global-states/atoms";
import { useAuth } from "@/hooks/useAuth";
import { useProgramingSkills } from "@/hooks/useProgramingSkills";
import { useSpecificRecruits } from "@/hooks/useSpecificRecruits";
import { recruitRepository } from "@/modules/recruit/recruit.repository";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useRecoilValue } from "recoil";
import { RecruitCard } from "../../organisms/RecruitCard";
import { PlainInput } from "../../atoms/PlainInput";
import { ConfirmModal } from "../../organisms/ConfirmModal";
import { EditProfileModal } from "../../organisms/EditProfileModal";
import { FormField } from "../../atoms/FormField";
import { GraduationYearRadio } from "../../atoms/GraduationYearRadio";
import { Loading } from "../common/Loading";
import { ProgramingSkill } from "@/types/programingSkill";
import { User } from "@/types/user";
import { userAgent } from "next/server";
import { ProgramingSkillOptions } from "@/modules/programingSkill/programingSkill.repository";

type EditProfileProps = {
  userStateVal: User;
}

export const EditProfile = ({userStateVal}: EditProfileProps): JSX.Element => {
  // const userStateVal = useRecoilValue<UserStateType>(UserState);

  // const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserNameOpen, setIsUserNameOpen] = useState(false);
  const [isUniversityOpen, setIsUniversityOpen] = useState(false);
  const [isGraduationYearOpen, setIsGraduationYearOpen] = useState(false);
  const [isGithubInfoOpen, setIsGithubInfoOpen] = useState(false);
  const [isSkillOpen, setIsSkillOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { register, handleSubmit, control } = useForm();
  // const { ownRecruits } = useSpecificRecruits(firebaseUID);

  console.log(`userstateVal: ${userStateVal?.firebaseUID!}`)

  // useEffect(() => {
  //   console.log(`userstateVal(useEffect): ${userStateVal?.firebaseUID!}`)
  //   if (!userStateVal) {
  //     setIsLoading(true);
  //   } else {
  //     // setUser(userStateVal);
  //     setIsLoading(false);
  //   }
  // }, [userStateVal]);

  // if (isLoading || !userStateVal) return <Loading />

  // const deleteRecruit = async (recruit: any) => {
  //   await recruitRepository.delete(recruit.id);
  //   setIsConfirmOpen(false);
  //   // location.reload();
  // };

  return (
    <>
      <div>{userStateVal?.name}</div>
    </>
  )
//  return (
//     <div className="flex flex-col items-center gap-20 my-8">
//       {/* 名前とアイコン */}
//       <div className="flex flex-col gap-8 items-end">
//         <Image
//           src="/avatar.gif"
//           alt="人物アイコン"
//           width={160}
//           height={160}
//           className="rounded-full border border-black"
//         />
//         <div className="flex justify-around">
//           <div className="text-center">{userStateVal?.name}</div>
//           <Image
//             src="/pen.gif"
//             alt="鉛筆のロゴ"
//             width={60}
//             height={60}
//             onClick={() => setIsUserNameOpen(true)}
//           />
//         </div>
//       </div>
//       <EditProfileModal
//         isOpen={isUserNameOpen}
//         setIsOpen={setIsUserNameOpen}
//         userId={userStateVal?.firebaseUID}
//         handleSubmit={handleSubmit}
//       >
//         <PlainInput
//           labelText="名前"
//           placeholder="フルネームをご入力ください"
//           register={register}
//           registerLabel="name"
//         />
//       </EditProfileModal>
//       {/* 学校情報 */}
//       <FormField
//         labelText="大学・専門"
//         onCLick={() => setIsUniversityOpen(true)}
//       >
//         <div className="border rounded-md p-2 border-black">{userStateVal?.university}</div>
//       </FormField>
//       <EditProfileModal
//         isOpen={isUniversityOpen}
//         setIsOpen={setIsUniversityOpen}
//         userId={userStateVal?.firebaseUID}
//         handleSubmit={handleSubmit}
//       >
//         <PlainInput
//           labelText="大学・専門"
//           placeholder="学校名"
//           register={register}
//           registerLabel="university"
//         />
//       </EditProfileModal>
//       {/* 卒業予定年度 */}
//       {/* Nest.jsにculumnがそもそもない */}
//       <FormField
//         labelText="卒業予定年度"
//         onCLick={() => setIsGraduationYearOpen(true)}
//       >
//         <div className="px-8 py-2 rounded-3xl bg-white text-base text-center w-1/4">
//           {userStateVal?.graduateYear}
//         </div>
//       </FormField>
//       <EditProfileModal
//         isOpen={isGraduationYearOpen}
//         setIsOpen={setIsGraduationYearOpen}
//         userId={userStateVal?.firebaseUID}
//         handleSubmit={handleSubmit}
//       >
//         <GraduationYearRadio
//           control={control}
//           defaultChipColor={"bg-gray-100"}
//         />
//       </EditProfileModal>
//       {/* GtHubアカウント */}
//       <FormField
//         labelText="GitHubアカウント名"
//         onCLick={() => setIsGithubInfoOpen(true)}
//       >
//         <div className="border-b border-black">{userStateVal?.github}</div>
//       </FormField>
//       <EditProfileModal
//         isOpen={isGithubInfoOpen}
//         setIsOpen={setIsGithubInfoOpen}
//         userId={userStateVal?.firebaseUID}
//         handleSubmit={handleSubmit}
//       >
//         <PlainInput
//           labelText="GitHub アカウント名"
//           placeholder="https://github.com/<hoge> の<hoge>の部分"
//           register={register}
//           registerLabel="github"
//         />
//       </EditProfileModal>
//       {/* プログラミングスキル */}
//       <FormField
//         labelText="プログラミングスキル"
//         onCLick={() => setIsSkillOpen(true)}
//       >
//         <div className="flex flex-wrap gap-4">
//           {userStateVal?.programingSkills?.map((skill) => (
//             <div
//               key={skill}
//               className="px-8 py-2 rounded-3xl bg-white text-base"
//             >
//               {skill}
//             </div>
//           ))}
//         </div>
//       </FormField>
//       <EditProfileModal
//         isOpen={isSkillOpen}
//         setIsOpen={setIsSkillOpen}
//         userId={userStateVal?.firebaseUID}
//         handleSubmit={handleSubmit}
//       >
//         <div className="flex flex-col gap-6 text-lg">
//           <div>プログラミングスキル</div>
//           <Controller
//             name="programingSkills"
//             control={control}
//             render={({ field }) => (
//               <Select
//                 isMulti
//                 options={ProgramingSkillOptions}
//                 onChange={(selectedSkills) => {
//                   field.onChange(selectedSkills.map((skill) => skill.value));
//                 }}
//                 placeholder="スキル名を選択してください (複数選択可)"
//               />
//             )}
//           />
//         </div>
//       </EditProfileModal>
//       {/* userが作成している募集 */}
//       {/* <div className="flex flex-col gap-6 text-lg w-2/5">
//         <div>募集中のカード</div>
//         <div className="flex flex-wrap justify-center gap-16">
//           {ownRecruits && ownRecruits.length > 0 ? (
//             ownRecruits.map((recruit: any, index: number) => (
//               //以降をcomponentに切り出したい
//               <RecruitCard
//                 key={recruit.id}
//                 recruit={recruit.data}
//                 cardHeight={"h-80"}
//                 cardWidth={"w-60"}
//               >
//                 <div className="flex justify-end mr-2 mt-2">
//                   <Image
//                     src="/trash.gif"
//                     alt="削除アイコン"
//                     width={40}
//                     height={40}
//                     onClick={() => setIsConfirmOpen(true)}
//                   />
//                 </div>
//                 <ConfirmModal
//                   isOpen={isConfirmOpen}
//                   setIsOpen={setIsConfirmOpen}
//                   modalTitle="募集を削除しますか？"
//                   confirmOkText="削除"
//                   onClickEvent={() => deleteRecruit(recruit)}
//                 />
//               </RecruitCard>
//             ))
//           ) : (
//             <></>
//           )}
//         </div>
//       </div> */}
//     </div>
//   );
};
