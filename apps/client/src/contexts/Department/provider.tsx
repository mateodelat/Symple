"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import DepartmentContext from "./context";
import { departmentsService } from "@services/index";
import {
  type Department,
  type AppState,
  type DepartmentContextProviderProps,
} from "@/types";

export default function DeparmentContextProvider({
  children,
}: DepartmentContextProviderProps): JSX.Element {
  const { status } = useSession();

  const [departments, setDepartments] = useState<AppState["departments"]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const setInitialDepartments = (departments: Department[]): void => {
    setDepartments(departments);
    setIsLoading(false);
  };

  const addDepartment = (department: Department): void => {
    setDepartments([...departments, department]);
  };

  const updateDepartment = (id: string, department: Department): void => {
    const index = departments.findIndex((e) => e.id === id);
    const newDepartments = [...departments];
    newDepartments[index] = department;
    setDepartments(newDepartments);
  };

  const deleteDepartment = (id: string): void => {
    const newDepartments = departments.filter(
      (enterprise) => enterprise.id !== id,
    );
    setDepartments(newDepartments);
  };

  useEffect(() => {
    if (status === "authenticated") {
      const fetchDepartments = async (): Promise<void> => {
        const list = await departmentsService.getAll();
        setInitialDepartments(list);
      };
      void fetchDepartments();
    }
  }, [status]);

  return (
    <DepartmentContext.Provider
      value={{
        departments,
        setInitialDepartments,
        isLoading,
        addDepartment,
        updateDepartment,
        deleteDepartment,
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
}
