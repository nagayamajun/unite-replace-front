import { FocusEventHandler } from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { ErrorText } from "../Text/ErrorText";

//このPlainInputで対応できるtype
type InputType = 'text' | 'password' | 'tel' | 'email' | 'number' | 'search' | 'url' | 'date';

type Props = {
  label?: string;
  inputType: InputType;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: string;
  defaultValue?: string;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  disabled?: boolean;
  labelClassName?: string;
  inputClassName?: string;
}

export const PlainInput = ({
  label,
  inputType,
  placeholder = '',
  register,
  error,
  defaultValue,
  onBlur,
  disabled = false,
  labelClassName,
  inputClassName,
}: Props): JSX.Element => (
  <div className="flex flex-col gap-1 w-full">
    <label htmlFor={label} className={`${labelClassName} text-sm`} >
      {label}
    </label>
    <input 
      id={label}
      className="border border-gray-300 rounded-md shadow-sm p-2 sm:p-3 w-full h-[56px] focus:border-plain-green focus:outline-none"
      {...register}
      type={inputType} 
      placeholder={placeholder}
      disabled={disabled}
      defaultValue={defaultValue}
      onBlur={onBlur}
    />
    <div className="h-[24px]">
      {error && <ErrorText errorText={error} />}
    </div>
  </div>
)