import { FocusEventHandler, ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { ErrorText } from "../Text/ErrorText";

type Props = {
  label?: string;
  placeholder?: string;
  onBlur?: FocusEventHandler<HTMLSelectElement> | undefined;
  register?: UseFormRegisterReturn;
  error: string | undefined;
  defaultValue?: string | number;
  disabled?: boolean;
  labelFont?: string;
  inputFont?: string;
  optionsNum: number,
};

export const PlainSelectInput = ({
  label,
  onBlur,
  register,
  error,
  defaultValue,
  disabled,
  labelFont = "text-xs sm:text-sm",
  inputFont = "text-sm",
  optionsNum
}: Props): JSX.Element => {

  const generateOptions = (count: number) => {
    const options = [];
    for (let i = 1; i <= count; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="flex flex-col gap-1 mb-4 w-full">
      <label htmlFor={label} className={labelFont}>
        {label}
      </label>
      <select
        id={label}
        defaultValue={defaultValue}
        disabled={disabled}
        {...register}
        onBlur={onBlur}
        className={
          "border border-gray-300 rounded-md shadow-sm p-2 sm:p-3 w-full outline-green-500 h-[56px]" +
          inputFont
        }
      >
        {generateOptions(optionsNum)} 
      </select>

      <div className="h-[24px]">
        {error && (
          <ErrorText errorText={error} />
        )}
      </div>
    </div>
  );
};
