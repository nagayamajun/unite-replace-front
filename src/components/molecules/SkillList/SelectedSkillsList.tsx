import { ProgrammingSkill, ProgrammingSkillIcons } from "@/features/user/types/programingSkill";
import Image from "next/image";

type Props = {
  selectedSkillsDescription?: string,
  selectedSkills: ProgrammingSkill[],
  descriptionFontSize?: string,
  skillIconWSize?: number,
  skillIconHSize?: number
}

export const SelectedSkillsList = ({ selectedSkillsDescription, selectedSkills, descriptionFontSize='text-sm', skillIconHSize=20, skillIconWSize=20}: Props): JSX.Element => (
  <div className="flex flex-col">
  <p className={descriptionFontSize}>{selectedSkillsDescription}</p>
  <div className="break-all flex-row flex flex-wrap">
    {selectedSkills?.map((skill) => (
      <div key={skill} className="flex flex-wrap justify-start line-clamp-1">
        <div key={skill} className={`text-gray-500 inline-flex items-center py-1 px-1 mx-1 my-3 gap-x-1 ${descriptionFontSize}`}>
          <Image src={ProgrammingSkillIcons[skill as ProgrammingSkill]} alt={skill} width={skillIconWSize} height={skillIconHSize} />
          <p>{skill}</p>
       </div>
      </div>
    ))}
  </div>
</div>
);
