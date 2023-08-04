"use client";

import Image from "next/image";
import { useState } from "react";

import { AddUsers, Button, Form, Modal } from "@components/index";
import { useField, useToggle } from "@hooks/index";
import { AmountOfEmployees, type AppState, type User } from "@/types";
import { useEnterpriseContext } from "@contexts/Enterprise/context";
import { useUserContext } from "@contexts/User/context";
import enterpriseService from "@services/enterprises";
import styles from "./CreateEnterprise.module.scss";
import { toast } from "react-hot-toast";

export default function CreateEnterprise(): JSX.Element {
  const { addEnterprise } = useEnterpriseContext();
  const { users } = useUserContext();

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
    props: { numeric: "true" },
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

  const [addedUsers, setAddedUsers] = useState<AppState["users"]>([]);

  const fields = [name, image, turn, telephone, address, amountOfEmployees];
  const customFields = addedUsers.map((user) => ({ value: user.id }));

  const { value, toggle } = useToggle();

  const createEnterprise = async (): Promise<void> => {
    const fieldsData = fields.map(({ name, value, required }) => ({
      [name]: !required && value === "" ? undefined : value,
    }));
    const ids = addedUsers.map((user) => user.id);
    const payload = Object.assign({}, ...fieldsData, { admins: ids });

    try {
      console.log("debug try");
      const response = await enterpriseService.create(payload);
      const admins = users
        .filter((user) => ids.includes(user.id))
        .map(({ enterprises, ...user }) => ({ ...user }));
      const newEnterprise = { ...response, admins };

      addEnterprise(newEnterprise);
    } catch (error) {
      console.log("debug catch");

      console.log(error);
    }
  };

  const addUser = (user: User): void => {
    setAddedUsers([...addedUsers, user]);
  };

  const removeUser = (user: User): void => {
    setAddedUsers(addedUsers.filter((addedUser) => addedUser.id !== user.id));
  };

  const confirmModal = (): void => {
    toast.success("Usuarios añadidos correctamente.");
    toggle();
  };

  const cancelModal = (): void => {
    setAddedUsers([]);
  };

  return (
    <Form
      fields={fields}
      customFields={customFields}
      onSubmit={createEnterprise}
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
      {value && (
        <Modal
          isOpen={value}
          toggle={toggle}
          onConfirm={confirmModal}
          onCancel={cancelModal}
        >
          <AddUsers
            addedUsers={addedUsers}
            addUser={addUser}
            removeUser={removeUser}
          />
        </Modal>
      )}
    </Form>
  );
}
