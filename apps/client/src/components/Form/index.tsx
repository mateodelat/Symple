"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import Image from "next/image";

import { As, Button, UploadFile } from "@components/index";
import { type FileState, type FormProps } from "@/types";
import styles from "./Form.module.scss";
import { useEffect } from "react";

export default function Form({
  sections,
  schema,
  buttonSubmit = "Enviar",
  onSubmit,
  className = "",
  children,
  setFormMethods,
  files,
  handleFiles,
}: FormProps): JSX.Element {
  const formMethods = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    if (setFormMethods !== undefined) {
      setFormMethods(formMethods);
    }
  }, [setFormMethods]);

  return (
    <div className={styles.container}>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.container_form} ${className}`}
      >
        {sections.map(({ title, fields }) => {
          return (
            <div key={title.name} className={styles.container_form_section}>
              <As name={title.name} as={title.as} style={title.style} />
              {fields.map(
                ({
                  name,
                  type = "text",
                  label,
                  placeholder,
                  elementType,
                  options,
                  props,
                }) => (
                  <div key={name} className={styles.container_form_wrapper}>
                    <label
                      htmlFor={name}
                      className={styles.container_form_wrapper_label}
                    >
                      <strong
                        className={styles.container_form_wrapper_label_text}
                      >
                        {label}
                      </strong>
                    </label>
                    {elementType === "select" ? (
                      <select
                        id={name}
                        {...props}
                        {...register(name)}
                        className={styles.container_form_wrapper_input}
                      >
                        {options?.map(({ id, label }) => {
                          return (
                            <option key={id} value={id}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                    ) : elementType === "file" ? (
                      <UploadFile
                        file={
                          files?.find((file) => file.name === name) as FileState
                        }
                        handleSelectedFile={handleFiles ?? (() => {})}
                        id={name}
                        props={props ?? {}}
                      />
                    ) : (
                      <input
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        {...register(name)}
                        {...props}
                        className={styles.container_form_wrapper_input}
                      />
                    )}
                    {errors[name] !== null && (
                      <span className={styles.container_form_wrapper_error}>
                        {errors[name]?.message as string}
                      </span>
                    )}
                  </div>
                ),
              )}
            </div>
          );
        })}
        {children}
        <Button className={styles.container_form_button} type="submit">
          {buttonSubmit}
        </Button>
      </form>
    </div>
  );
}
