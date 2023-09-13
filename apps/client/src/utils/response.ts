import { errors } from "@constants/Errors";
import { type ErrorObject } from "@/types";

export const returnResponse = async (
  response: Response,
  hasParser?: boolean,
): Promise<any> => {
  if (hasParser === true) return response;
  try {
    const data = await response.json();
    if (!response.ok) {
      const { message, statusCode } = data as ErrorObject;
      const handler = errors[statusCode];
      throw new Error(
        `Ocurrió un error al realizar la petición: ${message ?? handler}`,
      );
    }
    return data;
  } catch (err: any) {
    throw new Error(
      `Ocurrió un error al realizar la petición: ${err.message as string}`,
    );
  }
};
