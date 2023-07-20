import type React from "react";

export interface Field {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type FieldProps = Omit<FieldProps, "value" | "onChange">;

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface NavigationProps {
  links: Link[];
  toggleAside?: () => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface Enterprise {
  id: string;
  name: string;
  image: string;
  turn: string;
  telephone: string;
  address: string;
  createdAt: Date;
}

export type UserState = Omit<User, "id" | "name" | "lastName">;

export interface AppState {
  user: UserState;
  enterprises: Enterprise[];
}
