import { ProgramingSkill } from "@/types/programingSkill";
import { ReactNode } from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import Select from "react-select";
import { FormRecruitData } from "../templetes/user/AddRecruit";

type ValidationRulus = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
}

type Props = {
  labelText: string;
  placepholder: string;
  control:Control<FieldValues, any>
  errors: FieldErrors<FieldValues>;
  rules?: ValidationRulus;
  registerLabel: string;
}

export const SkillSelect = ({ labelText, placepholder, control, rules, errors, registerLabel}: Props) => {
  //enum型からスキルオブジェクト作成
  const options = Object.values(ProgramingSkill).map((skill) => ({
    value: skill,
    label: skill,
  }))
  return (
    <div className="flex flex-col gap-1 mb-6">
      <label htmlFor="programingSkills" className="text-xs sm:text-sm">{labelText}</label>
      <Controller
        name={registerLabel}
        control={control}
        defaultValue={[]}
        rules={rules}
        render={({ field: {onChange, onBlur, value} }) => (
          <Select
            className="text-xs sm:text-sm text-gray-500"
            placeholder={placepholder}
            isMulti
            options={options}
            onChange={(selected) => {
              onChange(selected.map((item) => item.value));
            }}
            onBlur={onBlur}
            value={options.filter((option) => value.includes(option.value))}
          />
        )}
      />
      { errors[registerLabel] &&
        <p className="text-xs font-ligh text-red-500">{errors[registerLabel]?.message as ReactNode}</p>
      }
    </div>
  )
}
