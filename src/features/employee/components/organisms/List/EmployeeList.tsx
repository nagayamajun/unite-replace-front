import { Employee } from "@/features/auth/types/employee";
import { EmployeeCard } from "../Card/EmployeeCard";

type Props = {
  employees?: Employee[];
  flexContainerStyle?: string;
};

export const EmployeeList = ({
  employees,
  flexContainerStyle = "flex gap-8",
}: Props): JSX.Element => {
  return (
    <div className={flexContainerStyle}>
      {employees?.map((employee: Employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};
