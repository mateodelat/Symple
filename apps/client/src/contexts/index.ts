import { useDepartmentContext } from "./Department/context";
import { useEnterpriseContext } from "./Enterprise/context";
import { useUserContext } from "./User/context";
import { useRoleContext } from "./Role/context";

import DepartmentContextProvider from "./Department/provider";
import EnterpriseContextProvider from "./Enterprise/provider";
import UserContextProvider from "./User/provider";
import RoleContextProvider from "./Role/provider";

export {
  useDepartmentContext,
  useEnterpriseContext,
  useUserContext,
  useRoleContext,
  DepartmentContextProvider,
  EnterpriseContextProvider,
  UserContextProvider,
  RoleContextProvider,
};
