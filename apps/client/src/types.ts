import type React from "react";

export interface Field {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type FieldProps = Omit<Field, "value" | "onChange">;

export interface Enterprise {
  id: string;
  name: string;
  image: string;
  turn: string;
  telephone: string;
  address: string;
  admins: User[];
  createdAt: Date;
  // departments: Department[]
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  enterprises: Enterprise[];
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
  onClick: () => void;
  className?: string;
}

export type VerticalButtonProps = Omit<ButtonProps, "children">;

export interface UseToggle {
  value: boolean;
  toggle: (val?: boolean) => void;
}

export enum CardType {
  EnterpriseCard = "EnterpriseCard",
  UserCard = "UserCard",
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
