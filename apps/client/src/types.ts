export interface Field {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  props?: object;
  options?: Option[];
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  errors?: string[];
  handleErrors?: (errors: string[]) => void;
  clearErrors?: () => void;
}

export interface Option {
  value: string;
  label: string;
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
  avatar?: string;
  email: string;
  role: string;
  enterprises?: Enterprise[];
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
  onClick: () => any;
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
  list: Enterprise[] | User[];
  canCreateElement: boolean;
  newElement?: string;
  newElementPage?: string;
  listEmptyMessage: string;
  typeOfCard: CardType;
  className?: string;
  cardClassName?: string;
  cardOnClick?: (element?: any) => void;
}

export interface CardProps {
  element: Enterprise | User;
  type: CardType;
  className?: string;
  onClick?: (element?: any) => any;
}

export interface CardEnterprise {
  element: Enterprise;
  isPopupOpen: boolean;
  togglePopup: () => void;
  isModalOpen: boolean;
  toggleModal: (val?: boolean) => void;
}

export interface FormProps {
  fields: Field[];
  customFields?: Array<{
    required: boolean;
    value: any;
  }>;
  title?: string;
  buttonSubmit?: string;
  onSubmit: () => any;
  link?: LinkButtonProps;
  children?: React.ReactNode;
}

export interface CustomField {
  required: boolean;
  value: string | any[];
}

export interface CardUser {
  element: User;
}

export interface PopupProps {
  id: string;
  toggleModal: (val?: boolean) => void;
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
}

export interface EnterpriseContextType {
  enterprises: Enterprise[];
  isLoading: boolean;
  setInitialEnterprises: (enterprises: Enterprise[]) => void;
  addEnterprise: (enterprise: Enterprise) => void;
  deleteEnterprise: (id: string) => void;
}

export interface UserContextType {
  users: User[];
  isLoading: boolean;
  setInitialUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

export interface EntepriseContextProviderProps {
  children: React.ReactNode;
}

export type UserContextProviderProps = EntepriseContextProviderProps;

export type DeleteEnterpriseProps = Omit<
  ModalProps,
  "children" | "onConfirm"
> & {
  enterpriseId: string;
};

export interface LinkButtonProps {
  href: string;
  label: string;
  className?: string;
}

export interface AppState {
  enterprises: Enterprise[];
  users: User[];
}

export interface CreateEnterpriseDTO {
  name: string;
  image?: string;
  turn: string;
  address: string;
  telephone: string;
  amountOfEmployees: AmountOfEmployees;
  admins: string[];
}

export enum AmountOfEmployees {
  "OneToTen" = "1-10",
  "elevenToTwentyFive" = "11-25",
  "TwentySixToFifty" = "26-50",
  "FiftyPlus" = "50+",
}

export interface SearchBarProps {
  title: string;
}

export interface AddUsersProps {
  addedUsers: User[];
  addUser: (user: User) => void;
  removeUser: (user: User) => void;
}
