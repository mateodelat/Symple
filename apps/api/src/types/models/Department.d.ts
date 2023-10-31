import { type UserAuth } from "../Auth";

export interface SubDepartment {
  name: string;
  subDepartment: SubDepartment[];
}

export interface CheckUserHasAccessToDepartmentProps {
  user: UserAuth;
  department: string;
}