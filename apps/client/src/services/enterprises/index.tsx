import { type Enterprise } from "@/types";

const getAll = async (): Promise<Enterprise[]> => {
  return await fetch(`${process.env.SERVER_URL ?? ""}/enterprises/`, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  }).then(async (res) => await res.json());
};

export const enterpriseService = {
  getAll,
};
