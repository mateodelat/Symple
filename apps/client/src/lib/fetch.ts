import { getSession } from "next-auth/react";
import { returnResponse } from "@utils/response";

interface FetchParams {
  baseUrl: string;
  method: string;
  options?: Record<string, any>;
}

export const customFetch = async ({
  baseUrl,
  method,
  options = {},
}: FetchParams): Promise<any> => {
  const session = await getSession();

  const response = await fetch(baseUrl, {
    method,
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken as string}`,
    },
  });

  return await returnResponse(response);
};
