import { ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type ValidationRulus = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
}

type PlainInputProps = {
  labelText?: string;
  inputType?: string;
  placeholder: string;
  register?: UseFormRegister<FieldValues>;
  registerLabel: string;
  rules?: ValidationRulus;
  errors: FieldErrors<FieldValues>
};

export const PlainInput = ({
  labelText,
  inputType = "text",
  placeholder = "",
  register,
  registerLabel,
  rules,
  errors
}: PlainInputProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label htmlFor="nameInput" className="text-xs sm:text-sm">{labelText}</label>
      <input
        id="nameInput"
        type={inputType}
        placeholder={placeholder}
        className="border border-gray-300 rounded-md shadow-sm text-sm p-2 sm:p-3 w-full outline-green-500"
        {...(register && register(registerLabel ?? "",
          rules
        ))}
      />
      {errors[registerLabel] && <p className="text-xs font-ligh text-red-500">{errors[registerLabel]?.message as ReactNode}</p>}
    </div>
  );
};
