import {
  type Enterprise,
  type CreateEnterpriseDTO,
  type EditEnterpriseDTO,
  type ErrorObject,
} from "@/types";
import { customFetch } from "@lib/fetch";

const baseUrl = `${process.env.SERVER_URL ?? ""}/enterprises`;

const getAll = async (): Promise<Enterprise[]> => {
  const response = await customFetch({
    baseUrl,
    method: "GET",
    options: {
      next: {
        revalidate: 30,
      },
    },
  });
  return response;
};

const create = async (payload: CreateEnterpriseDTO): Promise<Enterprise> => {
  const response = await customFetch({
    baseUrl,
    method: "POST",
    options: {
      body: JSON.stringify(payload),
    },
  });
  return response;
};

const update = async (
  id: string,
  payload: EditEnterpriseDTO,
): Promise<Enterprise> => {
  const response = await customFetch({
    baseUrl: `${baseUrl}/${id}`,
    method: "PATCH",
    options: {
      body: JSON.stringify(payload),
    },
  });
  return response;
};

const deleteOne = async (id: string): Promise<ErrorObject> => {
  const response = await customFetch({
    baseUrl: `${baseUrl}/${id}`,
    method: "DELETE",
  });
  return response;
};

const enterpriseService = {
  getAll,
  create,
  update,
  deleteOne,
};

export default enterpriseService;
