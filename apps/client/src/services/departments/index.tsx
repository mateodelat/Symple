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

const getAll = async (): Promise<Department[]> => {
  const response = await customFetch({
    baseUrl,
    method: "GET",
  });
  return response;
};

const getAllPerEnterprise = async (
  enterpriseId: string,
): Promise<Department[]> => {
  const response = await customFetch({
    baseUrl: `${baseUrl}/${enterpriseId}`,
    method: "GET",
  });
  return response;
};

const departmentsService = {
  create,
  getAll,
  getAllPerEnterprise,
};

export default departmentsService;
