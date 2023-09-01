import { type User } from "@/modules/users/user.entity";

export interface QueryGetAll {
  limit: number;
  offset: number;
  user: User;
}
