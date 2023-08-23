import { errors } from "@constants/index";
import { type ErrorObject } from "@/types";

export const returnResponse = async (response: Response): Promise<any> => {
  const data = await response.json();
  if (!response.ok) {
    const { message, statusCode } = data as ErrorObject;
    const handler = errors[statusCode];
    throw new Error(
      `Ocurrió un error al realizar la petición: ${message ?? handler}`,
    );
  }
  return data;
};
