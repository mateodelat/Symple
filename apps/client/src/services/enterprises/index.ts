import {
  type Enterprise,
  type ResponseObject,
  type CreateEnterpriseDTO,
} from "@/types";

const baseUrl = process.env.SERVER_URL ?? "";

const getAll = async (): Promise<Enterprise[]> => {
  return await fetch(`${baseUrl}/enterprises/`, {
    method: "GET",
    next: {
      revalidate: 30,
    },
  }).then(async (res) => {
    const response: Enterprise[] = await res.json();
    return response;
  });
};

const create = async (payload: CreateEnterpriseDTO): Promise<Enterprise> => {
  return await fetch(`${baseUrl}/enterprises/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then(async (res) => {
    const response: Enterprise = await res.json();
    return response;
  });
};

const deleteOne = async (id: string): Promise<ResponseObject> => {
  return await fetch(`${baseUrl}/enterprises/${id}`, {
    method: "DELETE",
  })
    .then(async (res) => await res.json())
    .catch((err) => err);
};

const enterpriseService = {
  getAll,
  create,
  deleteOne,
};

export default enterpriseService;
