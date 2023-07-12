import { FAIL_TO__GET_USER_INFO } from "@/constants/constants";
import { axiosInstance } from "@/libs/axios"
import { ConfirmModal } from "@/types/confirmModal"
import { Employee } from "@/types/employee";

export const employeeRepository = {
  async getEmployeeByFirebaseUID(): Promise<Employee> {
    const employee = (
      await axiosInstance.get('/employee/find-by-firebaseUID').catch((err) => {
      throw new Error(`Error ${err} `)
      })
    ).data;
    return employee
  }
}
