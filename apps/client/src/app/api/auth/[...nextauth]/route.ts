import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authService } from "@/services";
import { type LoginDTO } from "@/types";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        try {
          const response = await authService.login(credentials as LoginDTO);
          console.log(response);
        } catch (error) {
          console.log(error);
        }

        return { user: {}, id: "" };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
