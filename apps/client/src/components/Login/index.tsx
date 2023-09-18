"use client";

import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Form, Loader } from "@components/index";
import { loginFields, loginSchema } from "@/constants/LoginForm";
import { type LoginUserDTO } from "@/types";
import styles from "./Login.module.scss";

export default function Login(): JSX.Element {
  const { push } = useRouter();
  const { data: session, status } = useSession();
  const toastRef = useRef<string>("");
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);

  const handleLogin = async (data: LoginUserDTO): Promise<void> => {
    const { email, password } = data;
    toastRef.current = toast.loading("Validando credenciales...");
    const res = await signIn("credentials", {
      email,
      password,
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
          <div className={styles.login_left} />
          <div className={styles.login_right}>
            <h1 className={styles.login_right_title}>Bienvenido a Symple.</h1>
            <Form
              sections={loginFields}
              schema={loginSchema}
              onSubmit={handleLogin}
              className={styles.login_right_form}
              fieldsClassName={styles.login_right_form_fields}
              buttonSubmit="Iniciar sesión"
            />
          </div>
        </section>
      )}
      {status === "loading" && isLoggedIn && <Loader />}
    </>
  );
}
