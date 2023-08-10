import { ReactNode } from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import Select from "react-select";
import { FormRecruitData } from "../../../../recruit/components/templates/AddRecruit";
import { ProgrammingSkillOptions } from "@/modules/programingSkill/programingSkill.repository";

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
            options={ProgrammingSkillOptions}
            onChange={(selected) => {
              onChange(selected.map((item) => item.value));
            }}
            onBlur={onBlur}
            value={ProgrammingSkillOptions.filter((option) => value.includes(option.value))}
          />
        )}
      />
      { errors[registerLabel] &&
        <p className="text-xs font-ligh text-red-500">{errors[registerLabel]?.message as ReactNode}</p>
      }
    </div>
  )
}
