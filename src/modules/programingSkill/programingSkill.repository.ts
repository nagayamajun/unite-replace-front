import { ProgramingSkill } from "../../types/programingSkill";

//enum型からスキルオブジェクト作成
export const ProgramingSkillOptions = Object.values(ProgramingSkill).map((skill) => ({
  value: skill,
  label: skill,
}))
