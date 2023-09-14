"use client";

import { useState, useEffect } from "react";

import { AddUsersWrapper, Form } from "@components/index";
import {
  type AppState,
  type EnterpriseFormProps,
  type CreateEnterpriseDTO,
  type EditEnterpriseDTO,
  type FileState,
  type CustomField,
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

  const [customFields, setCustomFields] = useState<CustomField>({
    addUsers: () => (
      <AddUsersWrapper addedUsers={addedUsers} setAddedUsers={setAddedUsers} />
    ),
  });

  const handleImage = (file: File): void => {
    setImage({ ...image, file });
  };
  const { back } = useRouter();

  const { users } = useUserContext();

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
    let tID = "";

    try {
      if (enterpriseToEdit?.id === undefined) {
        tID = toast.loading("Actualizando empresa");

        const response = await enterpriseService.create(
          data as CreateEnterpriseDTO,
        );
        const newEnterprise = { ...response, admins };
        addEnterprise(newEnterprise);
        toast.success(`Empresa ${newEnterprise.name} creada correctamente.`);
      } else {
        tID = toast.loading("Actualizando empresa");
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
      }, 300);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      toast.dismiss(tID);
    }
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

  useEffect(() => {
    setCustomFields({
      addUsers: () => (
        <AddUsersWrapper
          addedUsers={addedUsers}
          setAddedUsers={setAddedUsers}
        />
      ),
    });
  }, [addedUsers]);

  return (
    <Form
      sections={sections}
      schema={enterpriseSchema}
      onSubmit={createEnterprise}
      className={styles.form}
      fieldsClassName={styles.form_fields}
      setFormMethods={setFormMethods}
      handleFiles={handleImage}
      files={[image]}
      customFields={customFields}
    />
  );
}
