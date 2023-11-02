import { type Session } from "next-auth";
import { returnResponse } from "@utils/response";

const baseUrl = `${process.env.SERVER_URL as string}/auth`;

const login = async (email: string, password: string): Promise<Session> => {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return await returnResponse(response);
};

const authService = {
  login,
};
export default authService;
