"use client";

import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Form } from "@components/index";
import { useField } from "@/hooks/index";

import styles from "./Login.module.scss";
import { toast } from "react-hot-toast";

export default function Login(): JSX.Element {
  const { push } = useRouter();
  const { data: session, status } = useSession();
  const toastRef = useRef<string>("");
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);

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
    toastRef.current = toast.loading("Validando credenciales...");
    const res = await signIn("credentials", {
      email: email.value,
      password: password.value,
      redirect: false,
    });

    if (res?.error !== null)
      toast.error(res?.error as string, {
        id: toastRef.current,
      });
    else setisLoggedIn(true);
  };

  useEffect(() => {
    if (status === "authenticated") {
      if (isLoggedIn) {
        toast.success(`Bienvenido, ${session.user.name}`, {
          id: toastRef.current,
        });
      }

      push("/admin-panel");
    }
  }, [status, isLoggedIn]);

  return (
    <>
      {status === "unauthenticated" && (
        <section className={styles.login}>
          <h1 className={styles.login_title}>Bienvenido a Symple.</h1>
          <p className={styles.login_description}>
            Inicia sesión con tu correo y contraseña.
          </p>
          <Form fields={[email, password]} onSubmit={handleLogin} />
        </section>
      )}
    </>
  );
}
