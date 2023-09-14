import { type Section } from "@/types";
import { formErrors } from "@/constants/Errors";
import * as yup from "yup";

const { required } = formErrors;

export const schema = yup.object({
  name: yup.string().required(required),
});

export const sections: Section[] = [
  {
    title: {
      name: "Crear departamento",
      as: "h1",
    },
    fields: [
      {
        name: "name",
        label: "Nombre",
        placeholder: "Nombre",
      },
    ],
  },
];
