"use client";
import React from "react";

import { type FormProps } from "@/types";
import { Button } from "@components/index";
import styles from "./Form.module.scss";

export default function Form({
  fields,
  customFields = [],
  buttonSubmit = "Enviar",
  title,
  onSubmit,
  children,
}: FormProps): JSX.Element {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      {title !== undefined && <h2>{title}</h2>}
      <form onSubmit={handleSubmit} className={styles.container_form}>
        {fields.map(
          ({
            name,
            type,
            props,
            errors,
            options,
            clearErrors,
            handleErrors,
            ...field
          }) => {
            return (
              <div key={name} className={styles.container_form_wrapper}>
                <label
                  htmlFor={name}
                  className={styles.container_form_wrapper_label}
                >
                  {field.placeholder}
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
