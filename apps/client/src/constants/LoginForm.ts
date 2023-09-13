import { type Section } from "@/types";
import { formErrors } from "@/constants/Errors";
import * as yup from "yup";

const { email, required } = formErrors;

export const loginSchema = yup.object({
  email: yup.string().email(email).required(required),
  password: yup.string().required(required),
});

export const loginFields: Section[] = [
  {
    title: {
      name: "Inicia sesión con tu correo y contraseña",
      as: "p",
      style: {
        textAlign: "center",
        fontSize: "1.4rem",
        fontWeight: "700",
        color: "#93a3b4",
      },
    },
    fields: [
      {
        name: "email",
        type: "email",
        label: "Correo electrónico",
        placeholder: "Correo electrónico",
      },
      {
        name: "password",
        type: "password",
        label: "Contraseña",
        placeholder: "Contraseña",
      },
    ],
  },
];
