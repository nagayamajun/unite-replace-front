import { FocusEventHandler, ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type ValidationRules = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
};

const validateFileExtension = (value: any): boolean | string => {
  if (!value || value.length === 0) return 'ファイルを選択してください';
  
  const allowedExtensions = ['mp4', 'mov', 'avi'];
  const fileExtension = value[0].name.split('.').pop()?.toLowerCase();

  if (!fileExtension || !allowedExtensions.includes(fileExtension)) return '許可されていないファイル拡張子です(mp4, mov, avi 選択可)';
  return true;
};

type InputType = 'text' | 'password' | 'search' | 'tel' | 'file' | 'email' | 'input' | 'url' | 'number';

type PlainInputProps = {
  registerLabel: string;
  labelText?: string;
  inputType?: InputType;
  placeholder?: string;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  register?: UseFormRegister<FieldValues>;
  rules?: ValidationRules;
  errors?: FieldErrors<FieldValues>;
  defaultValue?: string;
  disabled?: boolean;
  labelFont?: string;
  inputFont?: string;
};

export const PlainInput = ({
  labelText,
  inputType = "text",
  placeholder = "",
  onBlur,
  register,
  registerLabel,
  rules,
  errors,
  defaultValue,
  disabled,
  labelFont = "text-xs sm:text-sm",
  inputFont = "text-sm",
}: PlainInputProps): JSX.Element => {
  // inputType が "file" の場合のみバリデーション関数を適用
  const validationRules = inputType === "file"
    ? {
        ...rules,
        validate: validateFileExtension,
      }
    : rules;

  return (
    <div className="flex flex-col gap-1 mb-4 w-full">
      <label htmlFor={registerLabel} className={labelFont}>
        {labelText}
      </label>
      <input
        id={registerLabel}
        type={inputType}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        {...(register && register(registerLabel ?? "", validationRules))}
        onBlur={onBlur}
        className={
          "border border-gray-300 rounded-md shadow-sm p-2 sm:p-3 w-full outline-green-500" +
          inputFont
        }
      />

      {errors && errors[registerLabel] && (
        <p className="text-xs font-ligh text-red-500">
          {errors[registerLabel]?.message as ReactNode}
        </p>
      )}
    </div>
  );
};

