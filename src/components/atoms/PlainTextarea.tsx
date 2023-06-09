import { FocusEventHandler, ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type ValidationRulus = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
}

type PlainTextAreaProps = {
  labelText?: string;
  placeholder?: string;
  register?: UseFormRegister<FieldValues>;
  registerLabel: string;
  errors?: FieldErrors<FieldValues>
  rules?: ValidationRulus
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  defaultValue?: string
}

//バリデーションを作成する

export const PlainTextArea = ({
  labelText,
  placeholder,
  register,
  onBlur,
  registerLabel,
  errors,
  rules,
  defaultValue,
}: PlainTextAreaProps): JSX.Element => {

  return (
    <>
      <div className="flex flex-col gap-1 mb-6 w-full">
        <label htmlFor="nameInput" className="text-xs sm:text-sm">{labelText}</label>
        <textarea
          id="textarea"
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="border border-gray-300 h-32 rounded-md shadow-sm w-full outline-green-500 text-sm p-2"
          {...(register && register(registerLabel ?? "",
            rules
          ))}
        ></textarea>
        {errors && (errors[registerLabel] && <p className="text-xs font-ligh text-red-500">{errors[registerLabel]?.message as ReactNode}</p>)}
      </div>
    </>
  )
}
