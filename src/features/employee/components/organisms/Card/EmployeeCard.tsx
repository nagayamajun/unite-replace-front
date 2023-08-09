import { PersonIcon } from "@/components/molecules/Icon/PersonIcon";
import { Employee } from "@/features/auth/types/employee";

type Props = {
  employee: Employee;
};

export const EmployeeCard = ({ employee }: Props): JSX.Element => (
  <div className="font-caveat group relative py-2 mb-2 h-full w-100 border overflow-hidden rounded-3xl bg-white lg:mb-3">
    <div className="flex justify-center">
      <PersonIcon
        originalIconImageSrc={employee.imageUrl}
        originalIconImageAlt={`${employee.name}のアイコン`}
      />
    </div>
    <div className="flex flex-col justify-center">
      <p className="m-auto p-1">{employee.name ? employee.name : "No Name"}</p>
      <p className="m-auto p-1">{employee.belongToCorporation?.name}</p>
    </div>
    {/* TODO:従業員プロフィール画面が出来次第、従業員プロフィールページへの導線を作る */}
    {/* <div className="flex justify-end mr-3">
      <Link href={`/corporation/user/${uid}`}>詳細ページ</Link>
    </div> */}
  </div>
);
