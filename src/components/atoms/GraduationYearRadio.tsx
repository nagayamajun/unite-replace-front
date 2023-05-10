import { useGraduationYears } from "@/hooks/useGraduationYears";
import { RadioGroup } from "@headlessui/react";
import { Control, Controller, FieldValues } from "react-hook-form";

type GraduationYearRadioProps = {
  control: Control<FieldValues, any>;
  defaultChipColor?: string;
};

export const GraduationYearRadio = ({
  control,
  defaultChipColor = "bg-white",
}: GraduationYearRadioProps): JSX.Element => {
  // const { graduationYears } = useGraduationYears();
  // const years = [...graduationYears]
  //   .filter((year) => year.year !== "other")
  //   .sort((a, b) => (a.year as number) - (b.year as number))
  //   .map((year) => `${year.year}年度`);
  // years.push("その他");

  //ここは切り離して別ファイルで管理する。
  //そもそも企業がフィルターかけるようにした方がいいからサーバーサイドでテーブルとして持たせる？
  const years = ["23卒", "24卒", "25卒", "26卒", "27卒", "その他" ]

  return (
    <div className="flex flex-col gap-6">
      <label htmlFor="radio" className="text-xs sm:text-sm">卒業予定年度</label>
      <Controller
        name="graduateYear"
        control={control}
        render={({ field }) => (
          <RadioGroup
            onChange={(graduateYear) => {
              field.onChange(graduateYear);
            }}
          >
            <div id="radio" className="flex flex-wrap gap-8">
              {years.length > 1 &&
                years.map((graduateYear: string) => (
                  <RadioGroup.Option key={graduateYear} value={graduateYear}>
                    {({ checked }) => {
                      return (
                        <span
                          className={`${
                            checked ? "bg-green-400 border-none text-white" : defaultChipColor
                          } sm:px-8 sm:py-2 py-1 px-6 rounded-3xl border border-gray-300 text-gray-500`}
                        >
                          {graduateYear}
                        </span>
                      );
                    }}
                  </RadioGroup.Option>
                ))}
            </div>
          </RadioGroup>
        )}
      />
    </div>
  );
};
