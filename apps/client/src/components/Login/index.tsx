"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Form } from "../index";
import { useField } from "@/hooks/index";

import styles from "./Login.module.scss";
import { toast } from "react-hot-toast";

export default function Login(): JSX.Element {
  const { push } = useRouter();
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

  const handleLogin = async (): Promise<void> => {
    try {
      const res = await signIn("credentials", {
        email: email.value,
        password: password.value,
        redirect: false,
      });
      console.log(res);
    } catch (error: any) {
      toast.error(`Error al iniciar sesión: ${error.message as string}`);
    }

    // push("/admin-panel");
  };

  return (
    <section className={styles.login}>
      <h1 className={styles.login_title}>Bienvenido a Symple.</h1>
      <p className={styles.login_description}>
        Inicia sesión con tu correo y contraseña.
      </p>
      <Form fields={[email, password]} onSubmit={handleLogin} />
    </section>
  );
}
