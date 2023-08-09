"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { AddUsers, Button, Form, Modal } from "@components/index";
import { useField, useFile, useToggle } from "@hooks/index";
import {
  AmountOfEmployees,
  type CustomField,
  type AppState,
  type User,
  type EnterpriseFormProps,
} from "@/types";
import { useEnterpriseContext } from "@contexts/Enterprise/context";
import { useUserContext } from "@contexts/User/context";
import { enterpriseService } from "@services/index";
import styles from "./EnterpriseForm.module.scss";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getBase64 } from "@utils/convertImage";

export default function EnterpriseForm({
  id = "",
  isEditMode = false,
}: EnterpriseFormProps): JSX.Element {
  const { addEnterprise, updateEnterprise, enterprises } =
    useEnterpriseContext();

  const [addedUsers, setAddedUsers] = useState<AppState["users"]>([]);
  const [imageSource, setImageSource] = useState<string>("");
  const { back } = useRouter();

  const { users } = useUserContext();

  const { file, handleSelectedFile } = useFile();

  const name = useField({
    type: "text",
    placeholder: "Nombre",
    name: "name",
    required: true,
  });

  const image = useField({
    type: "file",
    placeholder: "Imagen",
    name: "image",
    required: false,
    props: { accept: "image/*", hidden: true },
    fileProps: {
      file,
      handleSelectedFile,
      resolvedImage: imageSource,
    },
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

  const fields = [name, image, turn, telephone, address, amountOfEmployees];

  const customFields: CustomField[] = [
    {
      required: true,
      value: addedUsers.map((user) => ({ value: user.id })),
    },
  ];

  const { value, toggle } = useToggle();

  const createEnterprise = async (): Promise<void> => {
    try {
      const fieldsData = fields.map(({ name, value, required }) => ({
        [name]: !required && value === "" ? undefined : value,
      }));
      const ids = addedUsers.map((user) => user.id);
      const payload = Object.assign({}, ...fieldsData, { admins: ids });
      if (file !== undefined && imageSource !== undefined) {
        payload.image = imageSource;
      }
      const admins = users
        .filter((user) => ids.includes(user.id))
        .map(({ enterprises, ...user }) => ({ ...user }));
      if (!isEditMode) {
        const response = await enterpriseService.create(payload);
        const newEnterprise = { ...response, admins };
        addEnterprise(newEnterprise);
        toast.success(`Empresa ${newEnterprise.name} creada correctamente.`);
      } else {
        const response = await enterpriseService.update(id, payload);
        updateEnterprise(id, response);
        console.log(response);
        toast.success(`Empresa ${response.name} actualizada correctamente.`);
      }
      setTimeout(() => {
        back();
      }, 1500);
    } catch (e: any) {
      toast.error(e.message);
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

  useEffect(() => {
    const getImage = async (): Promise<void> => {
      if (file !== undefined)
        await getBase64(file as File, (result: string) => {
          setImageSource(result);
        });
      else setImageSource("");
    };
    void getImage();
  }, [file]);

  useEffect(() => {
    const enterpriseToEdit = enterprises.find(
      (enterprise) => enterprise.id === id,
    );
    console.log(enterpriseToEdit);
    if (enterpriseToEdit !== undefined) {
      name.onChange(enterpriseToEdit.name);
      turn.onChange(enterpriseToEdit.turn);
      telephone.onChange(enterpriseToEdit.telephone);
      address.onChange(enterpriseToEdit.address);
      amountOfEmployees.onChange(enterpriseToEdit.amountOfEmployees);
      setImageSource(enterpriseToEdit.image);
      setAddedUsers(enterpriseToEdit.admins);
    }
    console.log("re render");
  }, [id]);

  return (
    <Form
      fields={fields}
      customFields={customFields}
      onSubmit={createEnterprise}
      className={styles.form}
      title={!isEditMode ? "Crear empresa" : "Editar empresa"}
    >
      <label htmlFor="addUsers" className={styles.label}>
        <strong className={styles.label_text}>Añadir usuario</strong>
      </label>
      <Button
        onClick={toggle}
        className={styles.button}
        props={{ name: "addUsers" }}
      >
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
