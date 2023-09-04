import { FocusEventHandler, ReactNode, useState } from "react";
import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import Select from "react-select";
import { ProgrammingSkillOptions } from "@/modules/programingSkill/programingSkill.repository";
import { ProgrammingSkill, ProgrammingSkillIcons } from "@/features/user/types/programingSkill";
import { Option } from "@/features/recruit/types/recruitCard";
import Image from "next/image";

type ValidationRules = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
};

type Props = {
  labelText: string;
  placeholder: string;
  control: Control<FieldValues, any>;
  errors: FieldErrors<FieldValues>;
  rules?: ValidationRules;
  registerLabel: string;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  defaultValue?: Option
};

export const SkillSelect = ({
  labelText,
  placeholder,
  control,
  rules,
  errors,
  registerLabel,
  defaultValue,
  onBlur
}: Props) => {
  const [selectedSkills, setSelectedSkills] = useState<Option[]>([]);
  return (
    <div className="flex flex-col gap-1 mb-6 w-full">
      <label htmlFor="programingSkills" className="text-xs sm:text-sm">
        {labelText}
      </label>
      <Controller
        name={registerLabel}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <Select
            className="text-xs sm:text-sm text-gray-500"
            placeholder={placeholder}
            isMulti
            options={ProgrammingSkillOptions}
            onChange={(selectedSkills) => {
              setSelectedSkills(selectedSkills as Option[]);
              field.onChange(selectedSkills.map((skill) => skill.value));
            }}
            onBlur={onBlur}
          />
        )}
      />
      <div className="break-all flex-row flex flex-wrap">
        {selectedSkills?.map((skill) => (
          <div key={skill.label} className="flex flex-wrap justify-start line-clamp-1">
            <div className={`text-gray-500 inline-flex items-center py-1 px-1 mx-1 my-3 gap-x-1 `}>
              <Image src={ProgrammingSkillIcons[skill.value as ProgrammingSkill]} alt={skill.value} width={20} height={20} />
              <p>{skill.label}</p>
          </div>
          </div>
        ))}
      </div>

      {errors[registerLabel] && (
        <p className="text-xs font-ligh text-red-500">
          {errors[registerLabel]?.message as ReactNode}
        </p>
      )}
    </div>
  );
};
