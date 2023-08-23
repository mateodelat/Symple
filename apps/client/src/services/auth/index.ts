import { type LoginDTO, type Session } from "@/types";
import { returnResponse } from "@utils/response";

const baseUrl = `${process.env.SERVER_URL as string}/auth`;

const login = async (payload: LoginDTO): Promise<Session> => {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return await returnResponse(response);
};

const authService = {
  login,
};
export default authService;
