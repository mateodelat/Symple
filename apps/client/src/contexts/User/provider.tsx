"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import UserContext from "./context";
import userService from "@services/users";
import {
  type User,
  type AppState,
  type UserContextProviderProps,
} from "@/types";

export default function UserContextProvider({
  children,
}: UserContextProviderProps): JSX.Element {
  const { status } = useSession();

  const [users, setUsers] = useState<AppState["users"]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);

  const addUser = (enterprise: User): void => {
    setIsAddingUser(false);
    setUsers([...users, enterprise]);
    setIsAddingUser(true);
  };

  const setInitialUsers = (users: User[]): void => {
    setUsers(users);
    setIsLoading(false);
  };

  const deleteUser = (id: string): void => {
    const newUsers = users.filter((enterprise) => enterprise.id !== id);
    setUsers(newUsers);
  };

  useEffect(() => {
    if (status === "authenticated") {
      const fetchUsers = async (): Promise<void> => {
        const list = await userService.getAll();
        setInitialUsers(list);
      };
      void fetchUsers();
    }
  }, [status]);

  return (
    <UserContext.Provider
      value={{
        users,
        setInitialUsers,
        isLoading,
        addUser,
        deleteUser,
        isAddingUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
