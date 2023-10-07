import { HTMLInputTypeAttribute, ReactNode } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type ValidationRulus = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
}

type Props = {
  labelText: string;
  placeholder: string;
  buttonType: HTMLInputTypeAttribute;
  register: UseFormRegister<FieldValues>;
  registerLabel: string;
  rules?: ValidationRulus;
  errors: FieldErrors<FieldValues>;
}

//企業側のリファクタの際にPlainInputに統一して廃止するする。
export const AuthInput: React.FC<Props> = ({ labelText, placeholder, buttonType, register, registerLabel, rules, errors}): JSX.Element => {

  return (
    <div className="mt-5 text-xl ">
      <label className="text-sm">{labelText}</label><br />
      <input
        type={buttonType}
        placeholder={placeholder}
        {...(register && register(registerLabel ?? "",
          rules
        ))}
        className="border outline-green-500  border-gray-300 rounded-md p-2 text-sm sm:text-base  w-full mt-1"
      />
      {errors[registerLabel] && <p className="text-xs font-ligh text-red-500">{errors[registerLabel]?.message as ReactNode}</p>}
    </div>
  )
}
