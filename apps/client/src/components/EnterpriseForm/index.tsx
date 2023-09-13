"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import { AddUsers, Button, CardUser, Form, Modal } from "@components/index";
import { useToggle } from "@hooks/index";
import {
  type AppState,
  type User,
  type EnterpriseFormProps,
  type CreateEnterpriseDTO,
  type EditEnterpriseDTO,
  type FileState,
} from "@/types";
import { useEnterpriseContext } from "@contexts/Enterprise/context";
import { useUserContext } from "@contexts/User/context";
import { enterpriseService, uploadService } from "@services/index";
import styles from "./EnterpriseForm.module.scss";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { enterpriseFields, enterpriseSchema } from "@/constants/EnterpriseForm";
import { type UseFormReturn } from "react-hook-form";

export default function EnterpriseForm({
  enterpriseToEdit,
}: EnterpriseFormProps): JSX.Element {
  const { addEnterprise, updateEnterprise } = useEnterpriseContext();

  const [addedUsers, setAddedUsers] = useState<AppState["users"]>([]);
  const [sections, setSections] = useState(enterpriseFields);
  const [formMethods, setFormMethods] = useState<UseFormReturn | null>(null);
  const [image, setImage] = useState<FileState>({
    name: "image",
    purpose: "enterprise",
    file: undefined,
  });

  const handleImage = (file: File): void => {
    setImage({ ...image, file });
  };
  const { back } = useRouter();

  const { users } = useUserContext();

  const { value, toggle } = useToggle();

  const createEnterprise = async (
    data: CreateEnterpriseDTO | EditEnterpriseDTO,
  ): Promise<void> => {
    const ids = addedUsers.map((user) => user.id);
    data.admins = ids;
    const admins = users
      .filter((user) => ids.includes(user.id))
      .map(({ enterprises, ...user }) => ({ ...user }));

    if (formMethods?.getValues().admins.length === 0) {
      toast.error("Debe añadir al menos un administrador a la empresa.");
      return;
    }

    if (image.file !== undefined && image.file instanceof File) {
      try {
        const response = await uploadService.upload(image);
        data.image = response.filename;
      } catch (err: any) {
        toast.error(
          `Ocurrió un error al intentar subir el archivo: ${
            err.message as string
          }`,
        );
      }
    }

    try {
      if (enterpriseToEdit?.id === undefined) {
        const response = await enterpriseService.create(
          data as CreateEnterpriseDTO,
        );
        const newEnterprise = { ...response, admins };
        addEnterprise(newEnterprise);
        toast.success(`Empresa ${newEnterprise.name} creada correctamente.`);
      } else {
        const response = await enterpriseService.update(
          enterpriseToEdit.id,
          data as EditEnterpriseDTO,
        );
        response.admins = admins;
        updateEnterprise(enterpriseToEdit.id, response);
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
    if (enterpriseToEdit !== undefined) {
      setSections((prev) => {
        const newSections = [...prev];
        newSections[0].title.name = "Editar empresa";
        return newSections;
      });
      if (enterpriseToEdit.image !== undefined) {
        setImage({ ...image, file: enterpriseToEdit.image });
      }
      if (formMethods !== null) {
        formMethods.reset(enterpriseToEdit);
        setAddedUsers(enterpriseToEdit.admins);
      }
    }
  }, [enterpriseToEdit, formMethods]);

  return (
    <Form
      sections={sections}
      schema={enterpriseSchema}
      onSubmit={createEnterprise}
      className={styles.form}
      setFormMethods={setFormMethods}
      handleFiles={handleImage}
      files={[image]}
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
      {!value && addedUsers.length > 0 && (
        <div className={styles.addedUsers}>
          <h4>Usuarios añadidos</h4>
          {addedUsers.map((user) => (
            <CardUser key={user.id} element={user} />
          ))}
        </div>
      )}
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
