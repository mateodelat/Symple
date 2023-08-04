import {
  type Enterprise,
  type ResponseObject,
  type CreateEnterpriseDTO,
} from "@/types";

const baseUrl = `${process.env.SERVER_URL ?? ""}/enterprises`;

const getAll = async (): Promise<Enterprise[]> => {
  return await fetch(baseUrl, {
    method: "GET",
    next: {
      revalidate: 30,
    },
  }).then(async (res) => {
    const response: Enterprise[] = await res.json();
    return response;
  });
};

const create = async (payload: CreateEnterpriseDTO): Promise<any> => {
  return await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

const deleteOne = async (id: string): Promise<ResponseObject> => {
  return await fetch(`${baseUrl}/${id}`, {
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
