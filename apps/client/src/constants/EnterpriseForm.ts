import { AmountOfEmployees, type Section } from "@/types";
import { formErrors } from "@/constants/Errors";
import * as yup from "yup";

const { required } = formErrors;

export const enterpriseSchema = yup.object({
  name: yup.string().required(required),
  turn: yup.string().required(required),
  telephone: yup.string().required(required),
  address: yup.string().required(required),
  amountOfEmployees: yup.string().required(required),
});

export const enterpriseFields: Section[] = [
  {
    title: {
      name: "Crear empresa",
      as: "h1",
    },
    fields: [
      {
        name: "name",
        label: "Nombre",
        placeholder: "Nombre",
      },
      {
        name: "image",
        label: "Imagen",
        elementType: "file",
        props: {
          accept: "image/jpeg,image/png",
        },
      },
      {
        name: "turn",
        label: "Giro",
        placeholder: "Giro",
      },
      {
        name: "telephone",
        label: "Teléfono de contacto",
        placeholder: "Teléfono de contacto",
      },
      {
        name: "address",
        label: "Dirección",
        placeholder: "Dirección",
      },
      {
        name: "amountOfEmployees",
        label: "Cantidad de empleados",
        options: Object.values(AmountOfEmployees).map((value) => ({
          id: value,
          label: value,
        })),
        elementType: "select",
      },
    ],
  },
];
