"use client";
import React from "react";

import { type FormProps } from "@/types";
import { Button, LinkButton } from "@components/index";
import styles from "./Form.module.scss";

export default function Form({
  fields,
  customFields = [],
  buttonSubmit = "Enviar",
  title,
  isLink = false,
  onSubmit,
  link = { href: "", label: "", className: "" },
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
            clearErrors,
            handleErrors,
            ...field
          }) => {
            return type === "select" ? (
              <select
                key={name}
                name={name}
                {...field}
                {...props}
                className={styles.container_form_input}
              >
                <option value={""}>-</option>
                {field.options?.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                key={name}
                type={type}
                {...field}
                {...props}
                className={styles.container_form_input}
              />
            );
          },
        )}
        {children}
        {/*
              --- TODO ---
              Change this Link to a button that executes the method to authenticate the user
            */}
        {isLink ? (
          <LinkButton
            href={link.href}
            label={link.label}
            className={styles.container_form_button}
          />
        ) : (
          <Button
            onClick={onSubmit}
            type="submit"
            props={{
              disabled:
                fields.some((field) => field.required && field.value === "") ||
                customFields.length === 0 ||
                customFields.some((field) => field.value === ""),
            }}
          >
            {buttonSubmit}
          </Button>
        )}
      </form>
    </div>
  );
}
