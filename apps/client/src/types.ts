import type React from "react";
import { type ErrorCode } from "./constants/Errors";
import type * as yup from "yup";
import { type SetStateAction } from "react";

export interface Field {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  props?: object;
  options?: Option[];
  fileProps?: FileProps;
  value: any;
  setInitialValue: (initialValue: string) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
  ) => void;
}

export interface Section {
  title: Title;
  fields: FormField[];
}

export interface Title {
  name: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  style?: Record<string, string | boolean>;
}

export interface FormField {
  name: string;
  type?: "text" | "email" | "password" | "date" | "numeric";
  label: string;
  placeholder?: string;
  props?: Record<string, string | boolean>;
  options?: Option[];
  fileProps?: FileProps;
  elementType?: "select" | "file" | "custom";
  style?: Record<string, string | boolean>;
  required?: boolean;
}

export interface Option {
  label: string;
  id: string;
}

export type FileProps = Pick<UploadFileProps, "file" | "handleSelectedFile"> & {
  resolvedImage: string;
};

export type FieldProps = Omit<Field, "value" | "onChange" | "setInitialValue">;

export interface Enterprise {
  id: string;
  name: string;
  image: string;
  turn: string;
  telephone: string;
  address: string;
  amountOfEmployees: AmountOfEmployees;
  admins: User[];
  createdAt: Date;
  departments: Department[];
}

export interface Department {
  name: string;
  enterprise: string;
  createdAt: Date;
  id: string;
}

export interface CreateDepartmentDTO {
  enterprise: string;
  name: string;
}

export interface DepartmentFormData {
  name: string;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  avatar?: string;
  email: string;
  role: string;
  enterprises?: Enterprise[];
}

export interface CreateUserDTO {
  email: string;
  name: string;
  lastName: string;
  password: string;
  role: string;
}

export interface EditUserDTO extends CreateUserDTO {
  id: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface NavigationProps {
  links: Link[];
  toggleAside?: () => void;
}

export type AsideProps = Omit<NavigationProps, "toggleAside">;

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => any;
  className?: string;
  type?: "button" | "submit" | "reset";
  props?: object;
}

export type VerticalButtonProps = Omit<ButtonProps, "children">;

export interface UseToggle {
  value: boolean;
  toggle: (val?: boolean) => void;
}

export enum CardType {
  EnterpriseCard,
  UserCard,
}

export interface EnterpriseCardComponentProps {
  element: Enterprise;
  isPopupOpen: boolean;
  togglePopup: () => void;
}

export interface UserCardComponentProps {
  element: User;
  isPopupOpen: boolean;
  togglePopup: () => void;
}

export type ServiceType = "enterpriseService" | "userService";

export interface ListProps {
  list: Enterprise[] | User[] | Department[];
  canCreateElement: boolean;
  newElement?: string;
  newElementPage?: string;
  listEmptyMessage: string;
  className?: string;
  Card: React.FC<{ element: any }>;
}

export interface GenericCardProps {
  element: Enterprise | User;
}
export interface CardProps {
  className?: string;
  onClick?: (element?: any) => any;
  children: React.ReactNode;
}

export interface CardEnterpriseProps {
  element: Enterprise;
  children?: React.ReactNode;
  onClick?: (element?: any) => any;
}

export type CardEnterpriseEditProps = Pick<CardEnterpriseProps, "element">;

export type CardUserProps = Omit<CardEnterpriseProps, "element"> & {
  element: User;
};

export type CardUserEditProps = Pick<CardUserProps, "element" | "onClick"> & {
  isAdding?: boolean;
};

export type CardDepartmentProps = Omit<CardEnterpriseProps, "element"> & {
  element: Department;
};

export type CustomField = Record<string, () => JSX.Element>;

export interface FormProps {
  sections: Section[];
  schema: yup.ObjectSchema<any>;
  buttonSubmit?: string;
  onSubmit: (values: any) => any;
  className?: string;
  fieldsClassName?: string;
  children?: React.ReactNode;
  setFormMethods?: (methods: any) => void;
  handleFiles?: (file: File) => void;
  files?: FileState[];
  customFields?: CustomField;
}

export interface UploadFileProps {
  text?: string;
  id?: string;
  file: FileState;
  handleSelectedFile: (e: File) => void;
  props: Record<string, string | boolean>;
}

export type UseFile = Pick<UploadFileProps, "file" | "handleSelectedFile">;

export interface PopupProps {
  toggleModal?: (val?: boolean) => void;
  children: React.ReactNode;
}

export interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
  onConfirm: () => any;
  onCancel?: () => any;
  className?: string;
}

export interface ErrorObject {
  message: string;
  statusCode: ErrorCode;
}

export interface EnterpriseContextType {
  enterprises: Enterprise[];
  isLoading: boolean;
  setInitialEnterprises: (enterprises: Enterprise[]) => void;
  addEnterprise: (enterprise: Enterprise) => void;
  updateEnterprise: (id: string, enterprise: Enterprise) => void;
  deleteEnterprise: (id: string) => void;
}

export interface UserContextType {
  users: User[];
  isLoading: boolean;
  setInitialUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  deleteUser: (id: string) => void;
  isAddingUser: boolean;
}

export interface DepartmentContextType {
  departments: Department[];
  isLoading: boolean;
  setInitialDepartments: (departments: Department[]) => void;
  addDepartment: (department: Department) => void;
  updateDepartment: (id: string, department: Department) => void;
  deleteDepartment: (id: string) => void;
}

export interface EntepriseContextProviderProps {
  children: React.ReactNode;
}

export type UserContextProviderProps = EntepriseContextProviderProps;

export type DepartmentContextProviderProps = EntepriseContextProviderProps;

export type DeleteEnterpriseProps = Omit<
  ModalProps,
  "children" | "onConfirm"
> & {
  enterpriseId: string;
};

export interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export interface AppState {
  enterprises: Enterprise[];
  users: User[];
  departments: Department[];
}

export interface CreateEnterpriseDTO {
  name: string;
  image?: string;
  turn: string;
  address: string;
  telephone: string;
  amountOfEmployees: AmountOfEmployees;
  admins: string[];
  departments: string[];
}

export enum AmountOfEmployees {
  "OneToTen" = "1-10",
  "elevenToTwentyFive" = "11-25",
  "TwentySixToFifty" = "26-50",
  "FiftyPlus" = "50+",
}

export interface SearchBarProps {
  title: string;
  handleData: (filter: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
}

export interface AddUsersProps {
  addedUsers: User[];
  addUser: (user: User) => void;
  removeUser: (user: User) => void;
}

export type AddUsersWrapperProps = Pick<AddUsersProps, "addedUsers"> & {
  setAddedUsers: (value: SetStateAction<User[]>) => void;
};

export type EditEnterpriseDTO = Partial<Omit<CreateEnterpriseDTO, "admins">> & {
  id?: string;
  createdAt?: Date;
  departments?: CreateDepartmentDTO[];
  admins?: User[];
};

export interface EnterpriseFormProps {
  enterpriseToEdit?: EditEnterpriseDTO;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface FileState {
  name: string;
  purpose: string;
  file: File | string | undefined;
  required?: boolean;
}

export interface UploadFileDTO {
  fileId: string;
  type: string;
  purpose: string;
}

export interface UserFormData {
  email: string;
  name: string;
  lastName: string;
  password: string;
  repeatPassword: string;
}

export interface DepartmentListProps {
  departments: Department[];
  enterpriseId: string;
}

export interface LoaderProps {
  className?: string;
}
