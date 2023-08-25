import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { type User } from "@/types";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
