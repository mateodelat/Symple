"use client";

import { useState } from "react";

import EnterpriseContext from "./context";
import {
  type Enterprise,
  type AppState,
  type EntepriseContextProviderProps,
} from "@/types";

export default function EnterpriseContextProvider({
  children,
}: EntepriseContextProviderProps): JSX.Element {
  const [enterprises, setEnterprises] = useState<AppState["enterprises"]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const addEnterprise = (enterprise: Enterprise): void => {
    setEnterprises([...enterprises, enterprise]);
  };

  const setInitialEnterprises = (enterprises: Enterprise[]): void => {
    setEnterprises(enterprises);
    setIsLoading(false);
  };

  const deleteEnterprise = (id: string): void => {
    const newEnterprises = enterprises.filter(
      (enterprise) => enterprise.id !== id,
    );
    setEnterprises(newEnterprises);
  };

  return (
    <EnterpriseContext.Provider
      value={{
        enterprises,
        setInitialEnterprises,
        isLoading,
        addEnterprise,
        deleteEnterprise,
      }}
    >
      {children}
    </EnterpriseContext.Provider>
  );
}
