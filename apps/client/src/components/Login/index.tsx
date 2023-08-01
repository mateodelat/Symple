"use client";

import React from "react";

import { Form } from "../index";
import { useField } from "@/hooks/index";

import styles from "./Login.module.scss";

export default function Login(): JSX.Element {
  const email = useField({
    type: "text",
    placeholder: "Correo electrónico",
    name: "email",
    required: true,
  });

  const password = useField({
    type: "password",
    placeholder: "Contraseña",
    name: "password",
    required: true,
  });

  const link = {
    href: "/admin-panel",
    label: "Iniciar sesión",
  };

  return (
    <section className={styles.login}>
      <h1 className={styles.login_title}>Bienvenido a Symple.</h1>
      <p className={styles.login_description}>
        Inicia sesión con tu correo y contraseña.
      </p>
      <Form fields={[email, password]} isLink={true} link={link} />
    </section>
  );
}
