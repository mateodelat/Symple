import { type ErrorObject } from "@/types";

export const returnResponse = async (response: Response): Promise<any> => {
  const data = await response.json();
  if (!response.ok) {
    const error = data as ErrorObject;
    throw new Error(
      `Ocurrió un error al realizar la petición: ${error.message}`,
    );
  }
  return data;
};
