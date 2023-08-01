"use client";

import Image from "next/image";

import { Button, Form, Modal } from "@components/index";
import { useField, useToggle } from "@hooks/index";
import { AmountOfEmployees, type Field } from "@/types";
import { useEnterpriseContext } from "@contexts/Enterprise/context";
import enterpriseService from "@services/enterprises";
import styles from "./CreateEnterprise.module.scss";

export default function CreateEnterprise(): JSX.Element {
  const { addEnterprise } = useEnterpriseContext();

  const name = useField({
    type: "text",
    placeholder: "Nombre",
    name: "name",
    required: true,
  });

  const image = useField({
    type: "text",
    placeholder: "Imagen",
    name: "image",
    required: false,
  });

  const turn = useField({
    type: "text",
    placeholder: "Giro",
    name: "turn",
    required: true,
  });

  const telephone = useField({
    type: "text",
    placeholder: "Teléfono de contacto",
    name: "telephone",
    required: true,
    props: { numeric: true },
  });

  const address = useField({
    type: "text",
    placeholder: "Dirección",
    name: "address",
    required: true,
  });

  const amountOfEmployees = useField({
    type: "select",
    placeholder: "Cantidad de empleados",
    name: "amountOfEmployees",
    required: true,
    options: Object.values(AmountOfEmployees).map((value) => ({
      label: value,
      value,
    })),
  });

  const fields = [name, image, turn, telephone, address, amountOfEmployees];

  const { value, toggle } = useToggle();

  const createEnterprise = async (data: Field[]): Promise<void> => {
    const fieldsData = data.map(({ name, value }) => ({ [name]: value }));
    const payload = Object.assign({}, ...fieldsData);
    const response = await enterpriseService.create(payload);
    addEnterprise(response);
  };

  return (
    <Form
      fields={fields}
      onSubmit={() => {
        void createEnterprise(fields);
      }}
    >
      <Button onClick={toggle} className={styles.button}>
        <span>Añadir usuario</span>
        <Image
          src={"/add_button.svg"}
          width={20}
          height={20}
          alt="Botón para añadir usuarios a empresa"
        />
      </Button>
      <Modal
        isOpen={value}
        toggle={toggle}
        onConfirm={() => {
          console.log("modal on confirm");
        }}
      >
        <h2>Alerta</h2>
        <p>
          ¿Seguro que quieres borrar la empresa?, Este cambio no se puede
          deshacer.
        </p>
      </Modal>
    </Form>
  );
}
