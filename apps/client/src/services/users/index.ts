import { type ResponseObject, type Service, type User } from "@/types";

const getAll = async (): Promise<User[]> => {
  return await fetch(`${process.env.SERVER_URL ?? ""}/users/`, {
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
  return await fetch(`${process.env.SERVER_URL ?? ""}/users/${id}`, {
    method: "DELETE",
  })
    .then(async (res) => await res.json())
    .catch((err) => err);
};

const userService: Service = {
  getAll,
  deleteOne,
};

export default userService;
