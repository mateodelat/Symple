import imageCompression from "browser-image-compression";
import { toast } from "react-hot-toast";

export async function compressImage(image: File): Promise<File | undefined> {
  const options = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 200,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(image, options);
    return compressedFile;
  } catch (e: any) {
    toast.error(e.message);
  }
}

export async function getBase64(file: File, cb: any): Promise<void> {
  const compressedImage = await compressImage(file);
  const reader = new FileReader();
  reader.readAsDataURL(compressedImage as File);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}
