"use client";
import React from "react";
import Image from "next/image";

import { type FormProps } from "@/types";
import { Button, UploadFile } from "@components/index";
import styles from "./Form.module.scss";

export default function Form({
  fields,
  customFields = [],
  buttonSubmit = "Enviar",
  title,
  onSubmit,
  className = "",
  children,
}: FormProps): JSX.Element {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      {title !== undefined && <h2>{title}</h2>}
      <form
        onSubmit={handleSubmit}
        className={`${styles.container_form} ${className}`}
      >
        {fields.map(
          ({
            name,
            type,
            props,
            options,
            fileProps,
            initialValue,
            ...field
          }) => {
            return (
              <div key={name} className={styles.container_form_wrapper}>
                <label
                  htmlFor={name}
                  className={styles.container_form_wrapper_label}
                >
                  <strong className={styles.container_form_wrapper_label_text}>
                    {field.placeholder}
                  </strong>
                </label>
                {type === "select" ? (
                  <select
                    name={name}
                    id={name}
                    {...field}
                    {...props}
                    className={styles.container_form_wrapper_input}
                  >
                    <option value={""}>-</option>
                    {options?.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                ) : type === "file" ? (
                  <>
                    <UploadFile
                      file={fileProps?.file}
                      handleSelectedFile={fileProps?.handleSelectedFile}
                      id={name}
                    />
                    {fileProps?.resolvedImage !== "" && (
                      <div className={styles.image}>
                        <Image
                          src={fileProps?.resolvedImage as string}
                          alt="Foto de empresa"
                          width={200}
                          height={200}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <input
                    type={type}
                    name={name}
                    id={name}
                    {...field}
                    {...props}
                    className={styles.container_form_wrapper_input}
                  />
                )}
              </div>
            );
          },
        )}
        {children}
        <Button
          onClick={onSubmit}
          className={styles.container_form_button}
          type="submit"
          props={{
            disabled:
              fields.some((field) => field.required && field.value === "") ||
              customFields.some(
                (field) =>
                  field.required &&
                  (field.value === "" || field.value.length === 0),
              ),
          }}
        >
          {buttonSubmit}
        </Button>
      </form>
    </div>
  );
}
