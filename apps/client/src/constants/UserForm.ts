import { formErrors } from "@/constants/Errors";
import { type Section } from "@/types";
import * as yup from "yup";

const { required, email, match } = formErrors;

export const schema = yup.object({
  email: yup.string().email(email).required(required),
  name: yup.string().required(required),
  lastName: yup.string().required(required),
  password: yup.string().required(required),
  repeatPassword: yup
    .string()
    .required(required)
    .oneOf([yup.ref("password")], match),
});

export const sections: Section[] = [
  {
    title: {
      name: "Registrar usuario nuevo",
      as: "h3",
    },
    fields: [
      {
        name: "email",
        label: "Correo electrónico",
        placeholder: "Correo electrónico",
      },
      {
        name: "name",
        label: "Nombre",
        placeholder: "Nombre",
      },
      {
        name: "lastName",
        label: "Apellido",
        placeholder: "Apellido",
      },
      {
        name: "password",
        label: "Contraseña",
        placeholder: "Contraseña",
        type: "password",
      },
      {
        name: "repeatPassword",
        label: "Repetir contraseña",
        placeholder: "Repetir contraseña",
        type: "password",
      },
    ],
  },
];
