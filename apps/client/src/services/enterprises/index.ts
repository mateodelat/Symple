import {
  type Enterprise,
  type CreateEnterpriseDTO,
  type EditEnterpriseDTO,
  type ErrorObject,
} from "@/types";
import { returnResponse } from "@utils/response";

const baseUrl = `${process.env.SERVER_URL ?? ""}/enterprises`;

const getAll = async (): Promise<Enterprise[]> => {
  const response = await fetch(baseUrl, {
    method: "GET",
    next: {
      revalidate: 30,
    },
  });
  return await returnResponse(response);
};

const create = async (payload: CreateEnterpriseDTO): Promise<Enterprise> => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return await returnResponse(response);
};

const update = async (
  id: string,
  payload: EditEnterpriseDTO,
): Promise<Enterprise> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return await returnResponse(response);
};

const deleteOne = async (id: string): Promise<ErrorObject> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  return await returnResponse(response);
};

const enterpriseService = {
  getAll,
  create,
  update,
  deleteOne,
};

export default enterpriseService;
