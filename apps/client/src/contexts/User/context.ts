"use client";

import { createContext, useContext } from "react";
import { type UserContextType } from "@/types";

const UserContext = createContext<UserContextType>({
  users: [],
  setInitialUsers: (users) => {},
  isLoading: true,
  addUser: (user) => {},
  deleteUser: (id) => {},
});

export const useUserContext = (): UserContextType => useContext(UserContext);

export default UserContext;
