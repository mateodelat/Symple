"use client";

import { createContext, useContext } from "react";
import { type EnterpriseContextType } from "@/types";

const EnterpriseContext = createContext<EnterpriseContextType>({
  enterprises: [],
  setInitialEnterprises: (enterprises) => {},
  isLoading: true,
  addEnterprise: (enterprise) => {},
  updateEnterprise: (id, enterprise) => {},
  deleteEnterprise: (id) => {},
});

export const useEnterpriseContext = (): EnterpriseContextType =>
  useContext(EnterpriseContext);

export default EnterpriseContext;
