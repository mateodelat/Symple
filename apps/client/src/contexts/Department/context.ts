"use client";

import { createContext, useContext } from "react";
import { type DepartmentContextType } from "@/types";

const DepartmentContext = createContext<DepartmentContextType>({
  departments: [],
  setInitialDepartments: (departments) => {},
  isLoading: true,
  addDepartment: (department) => {},
  updateDepartment: (id, department) => {},
  deleteDepartment: (id) => {},
});

export const useDepartmentContext = (): DepartmentContextType =>
  useContext(DepartmentContext);

export default DepartmentContext;
