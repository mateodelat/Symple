import { type ResponseObject, type User } from "@/types";

const baseUrl = `${process.env.SERVER_URL ?? ""}/users`;

const getAll = async (): Promise<User[]> => {
  return await fetch(baseUrl, {
    method: "GET",
    next: {
      revalidate: 60,
    },
  }).then(async (res) => {
    const response = await res.json();
    return response;
  });
};

const deleteOne = async (id: string): Promise<ResponseObject> => {
  return await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  })
    .then(async (res) => await res.json())
    .catch((err) => err);
};

const userService = {
  getAll,
  deleteOne,
};

export default userService;
