import { type FileState } from "@/types";
import { customFetch } from "@lib/fetch";

const baseUrl = `${process.env.SERVER_URL ?? ""}/uploads`;

const upload = async (payload: FileState): Promise<any> => {
  const formData = new FormData();
  const { file, name, purpose } = payload;
  if (file instanceof File) {
    formData.append("file", file);
    formData.append("type", name);
    formData.append("purpose", purpose);
  }

  const response = await customFetch({
    baseUrl,
    method: "POST",
    body: formData,
  });
  return response;
};

const uploadService = {
  upload,
};

export default uploadService;
