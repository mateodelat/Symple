import { type User } from "@/modules/users/user.entity";

export interface ValidateUserProps {
  email: string;
  password: string;
}

export type UserAuth = Pick<User, 'email' | 'name' | 'lastName' | 'role' | 'enterprises' | 'avatar'>
export interface UserToken {
  accessToken: string;
  user: UserAuth;
}