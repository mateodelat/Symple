import { type User } from "@/modules/users/user.entity";

export interface QueryGetAll {
  limit: number;
  offset: number;
  user: User;
}

export interface Department {
  id: string;
  name: string;
  subDepartments: Department[];
}
