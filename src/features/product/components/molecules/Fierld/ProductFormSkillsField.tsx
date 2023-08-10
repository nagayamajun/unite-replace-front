import { ProgramingSkill } from "@/features/user/types/programingSkill";
import { MouseEventHandler } from "react";
import { AiFillEdit } from "react-icons/ai";

type FormFieldProps = {
  labelText?: string;
  skills: ProgramingSkill[];
  onCLick: MouseEventHandler<HTMLButtonElement>;
};

export const ProductFormSkillsField = ({
  labelText,
  skills,
  onCLick,
}: FormFieldProps): JSX.Element => {
  if (skills.length === 0) return <></>
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row w-full mb-3">
        <p className="w-1/2">{labelText}</p>
        <button onClick={onCLick} className="w-1/2 flex items-end justify-end">
          <AiFillEdit className="text-lg"/>
        </button>
      </div>
      {/* TODO: 次のタスクでIconを用いてskillを共通化コンポーネントに分ける */}
      <div className="flex flex-row p-4 ">
        {skills.map((skill) => (
          <div
            key={skill}
            className="px-8 py-2 rounded-3xl bg-gray-200 "
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};
