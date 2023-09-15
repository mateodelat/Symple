import { type Section } from "@/types";
import * as yup from "yup";

export const schema = yup.object({});

export const sections: Section[] = [
  {
    title: {
      name: "Crear departamento",
      as: "h1",
    },
    fields: [
      {
        name: "department",
        label: "Nombre del departamento",
        elementType: "custom",
      },
    ],
  },
];
