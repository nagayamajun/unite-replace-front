import { FocusEventHandler, ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type ValidationRules = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
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
}: PlainInputProps): JSX.Element => (

  <div className="flex flex-col gap-1 mb-4 w-full">
    <label htmlFor="nameInput" className={labelFont}>
      {labelText}
    </label>
    <input
      id="nameInput"
      type={inputType}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      {...(register && register(registerLabel ?? "", rules))}
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
