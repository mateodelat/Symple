import { type Enterprise } from "@/types";

const getAll = async (): Promise<Enterprise[]> => {
  return await fetch(`${process.env.SERVER_URL ?? ""}/enterprises/`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  }).then(async (res) => {
    const response = await res.json();
    return response;
  });
};

const deleteOne = async (id: string): Promise<Response> => {
  return await fetch(`${process.env.SERVER_URL ?? ""}/enterprises/${id}`, {
    method: "DELETE",
  })
    .then(async (res) => await res.json())
    .catch((err) => err);
};

export const enterpriseService = {
  getAll,
  deleteOne,
};
