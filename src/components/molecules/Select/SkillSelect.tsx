import { ReactNode } from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import Select from "react-select";
import { FormRecruitData } from "../../../features/recruit/components/templates/AddRecruit";
import { ProgramingSkillOptions } from "@/modules/programingSkill/programingSkill.repository";

type ValidationRulus = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
}

type Props = {
  labelText: string;
  placeholder: string;
  control:Control<FieldValues, any>
  errors: FieldErrors<FieldValues>;
  rules?: ValidationRulus;
  registerLabel: string;
}

export const SkillSelect = ({ labelText, placeholder, control, rules, errors, registerLabel}: Props) => {
  return (
    <div className="flex flex-col gap-1 mb-6 w-full">
      <label htmlFor="programingSkills" className="text-xs sm:text-sm">{labelText}</label>
      <Controller
        name={registerLabel}
        control={control}
        defaultValue={[]}
        rules={rules}
        render={({ field: {onChange, onBlur, value} }) => (
          <Select
            className="text-xs sm:text-sm text-gray-500"
            placeholder={placeholder}
            isMulti
            options={ProgramingSkillOptions}
            onChange={(selected) => {
              onChange(selected.map((item) => item.value));
            }}
            onBlur={onBlur}
            value={ProgramingSkillOptions.filter((option) => value.includes(option.value))}
          />
        )}
      />
      { errors[registerLabel] &&
        <p className="text-xs font-ligh text-red-500">{errors[registerLabel]?.message as ReactNode}</p>
      }
    </div>
  )
}
