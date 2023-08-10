import { ProgrammingSkill} from "../../features/user/types/programingSkill";

//enum型からスキルオブジェクト作成
export const ProgrammingSkillOptions = Object.values(ProgrammingSkill).map((skill) => ({
  value: skill,
  label: skill,
}))
