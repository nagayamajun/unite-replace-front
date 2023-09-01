import { FocusEventHandler, ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type ValidationRules = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
};

type PlainInputProps = {
  labelText?: string;
  inputType?: string;
  placeholder?: string;
  onBlur?: FocusEventHandler<HTMLSelectElement> | undefined;
  register?: UseFormRegister<FieldValues>;
  registerLabel: string;
  rules?: ValidationRules;
  errors?: FieldErrors<FieldValues>;
  defaultValue?: string | number;
  disabled?: boolean;
  labelFont?: string;
  inputFont?: string;
  children?: ReactNode; // <option>要素を受け取るためにchildrenプロパティを追加
  optionsNum: number,
};

export const PlainSelectInput = ({
  labelText,
  onBlur,
  register,
  registerLabel,
  rules,
  errors,
  defaultValue,
  disabled,
  labelFont = "text-xs sm:text-sm",
  inputFont = "text-sm",
  children, // childrenプロパティを受け取る
  optionsNum
}: PlainInputProps): JSX.Element => {

  const generateOptions = (count: number) => {
    const options = [];
    for (let i = 1; i <= count; i++) {
      options.push(
        <option key={i} value={i}>
          {i}人
        </option>
      );
    }
    return options;
  };

  return (
    <div className="flex flex-col gap-1 mb-4 w-full">
      <label htmlFor={registerLabel} className={labelFont}>
        {labelText}
      </label>
      <select
        id={registerLabel}
        defaultValue={defaultValue}
        disabled={disabled}
        {...(register && register(registerLabel ?? "", rules))}
        onBlur={onBlur}
        className={
          "border border-gray-300 rounded-md shadow-sm p-2 sm:p-3 w-full outline-green-500 " +
          inputFont
        }
      >
        {generateOptions(optionsNum)} 
      </select>

      {errors && errors[registerLabel] && (
        <p className="text-xs font-light text-red-500">
          {errors[registerLabel]?.message as ReactNode}
        </p>
      )}
    </div>
  );
};
