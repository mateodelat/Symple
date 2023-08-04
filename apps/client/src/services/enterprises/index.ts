import { Enterprise, type CreateEnterpriseDTO, ErrorObject } from "@/types";
import { returnResponse } from "@utils/Response/index";

const baseUrl = `${process.env.SERVER_URL ?? ""}/enterprises`;

const getAll = async (): Promise<Enterprise[]> => {
  const response = await fetch(baseUrl, {
    method: "GET",
    next: {
      revalidate: 30,
    },
  });
  return returnResponse(response);
};

const create = async (payload: CreateEnterpriseDTO): Promise<Enterprise> => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return returnResponse(response);
};

const deleteOne = async (id: string): Promise<void | ErrorObject> => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
  return returnResponse(response);
};

const enterpriseService = {
  getAll,
  create,
  deleteOne,
};

export default enterpriseService;
