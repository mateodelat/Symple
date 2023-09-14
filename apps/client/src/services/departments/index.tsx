import { type Department, type CreateDepartmentDTO } from "@/types";
import { customFetch } from "@lib/fetch";

const baseUrl = `${process.env.SERVER_URL ?? ""}/departments`;

const create = async (payload: CreateDepartmentDTO): Promise<Department> => {
  const response = await customFetch({
    baseUrl,
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const departmentsService = {
  create,
};

export default departmentsService;
