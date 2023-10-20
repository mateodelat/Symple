import type React from 'react'
import { type ErrorCode } from './constants/Errors'
import type * as yup from 'yup'
import { type RefObject, type Dispatch, type SetStateAction, type ButtonHTMLAttributes, type SelectHTMLAttributes } from 'react'
import { type FieldErrors, type UseFormRegister } from 'react-hook-form'

export interface Field {
  name: string
  type: string
  placeholder: string
  required: boolean
  props?: object
  options?: Option[]
  fileProps?: FileProps
  value: any
  setInitialValue: (initialValue: string) => void
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
  ) => void
}

export interface Section {
  title: Title
  fields: FormField[]
  className?: string
}

export interface Title {
  name: string
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  style?: React.CSSProperties
}

export interface FormField {
  name: string
  type?: 'text' | 'email' | 'password' | 'date' | 'numeric'
  label?: string
  placeholder?: string
  props?: Record<string, string | boolean>
  options?: Option[]
  fileProps?: FileProps
  elementType?: 'select' | 'file' | 'custom' | 'textarea'
  style?: React.CSSProperties
  required?: boolean
}

export interface Option {
  label: string
  id: string
}

export type FileProps = Pick<UploadFileProps, 'file' | 'handleSelectedFile'> & {
  resolvedImage: string
}

export type FieldProps = Omit<Field, 'value' | 'onChange' | 'setInitialValue'>

export interface Enterprise {
  id: string
  name: string
  image: string
  turn: string
  telephone: string
  address: string
  amountOfEmployees: AmountOfEmployees
  admins: User[]
  createdAt: Date
  departments: Department[]
}

export type CreateDepartmentDTO = DepartmentState & {
  enterprise: string
}

export type EditDepartmentDTO = Partial<CreateDepartmentDTO>

export interface DepartmentFormData {
  name: string
}

export interface User {
  id: string
  name: string
  lastName: string
  avatar?: string
  email: string
  role: string
  enterprises?: Enterprise[]
}

export interface SessionUser {
  id: string
  name: string
  lastName: string
  avatar?: string
  email: string
  role: string
  enterprises?: string[]
}

export interface CreateUserDTO {
  email: string
  name: string
  lastName: string
  password: string
  role: string
}

export interface EditUserDTO extends CreateUserDTO {
  id: string
}

export interface Link {
  label: string
  href: string
}

export interface NavigationProps {
  links: Link[]
  toggleAside?: () => void
}

export type AsideProps = Omit<NavigationProps, 'toggleAside'>

export interface ButtonProps {
  children: React.ReactNode
  onClick?: any
  className?: string
  type?: 'button' | 'submit' | 'reset'
  style?: Record<string, string | boolean>
  props?: object
}

export type VerticalButtonProps = Omit<ButtonProps, 'children'>

export interface UseToggle {
  value: boolean
  toggle: (val?: boolean) => void
}

export interface UseWindowResize {
  windowSize: number
}

export interface UseStepper {
  currentStep: number
  nextStep: () => void
  previousStep: (index?: number) => void
  reset: () => void
}

export interface UseModal {
  ref: RefObject<HTMLDialogElement>
  handleConfirm: () => void
  handleCancel: () => void
  handleClick: () => void
  handleDialogClick: (e: React.MouseEvent<HTMLDialogElement>) => void
}

export interface UseModalProps {
  onConfirm: () => any
  onCancel: () => any
  toggle: (val?: boolean) => void
}

export enum CardType {
  EnterpriseCard,
  UserCard,
}

export interface EnterpriseCardComponentProps {
  element: Enterprise
  isPopupOpen: boolean
  togglePopup: () => void
}

export interface UserCardComponentProps {
  element: User
  isPopupOpen: boolean
  togglePopup: () => void
}

export type ServiceType = 'enterpriseService' | 'userService'

export interface ListProps {
  list: Enterprise[] | User[] | Department[]
  canCreateElement: boolean
  newElement?: string
  newElementPage?: string
  listEmptyMessage: string
  beforeListContent?: JSX.Element | (() => JSX.Element)
  afterListContent?: JSX.Element | (() => JSX.Element)
  className?: string
  Card: React.FC<{
    element: any
    cardProps?: Record<string, string | boolean>
  }>
  cardProps?: Record<string, any>
}

export interface GenericCardProps {
  element: Enterprise | User
}
export interface CardProps {
  className?: string
  onClick?: (element?: any) => any
  children: React.ReactNode
  title?: string
}

export interface CardEnterpriseProps {
  element: Enterprise
  children?: React.ReactNode
  onClick?: (element?: any) => any
}

export type CardEnterpriseEditProps = Pick<CardEnterpriseProps, 'element'>

export type CardUserProps = Omit<CardEnterpriseProps, 'element'> & {
  element: User
}

export type CardUserEditProps = Pick<CardUserProps, 'element' | 'onClick'> & {
  isAdding?: boolean
}

export type CardDepartmentProps = Omit<CardEnterpriseProps, 'element'> & {
  element: Department
}

export interface CardDepartmentEditProps extends CardDepartmentProps {
  updateDepartment: (department: Department) => void
  deleteDepartment: (id: string) => void
}

export type CustomField = Record<string, () => JSX.Element>

export interface FormProps {
  sections: Section[]
  schema: yup.ObjectSchema<any>
  buttonSubmit?: string
  onSubmit: (values: any) => any
  className?: string
  fieldsClassName?: string
  children?: React.ReactNode
  setFormMethods?: (methods: any) => void
  handleFiles?: (file: File) => void
  files?: FileState[]
  customFields?: CustomField
  isStepper?: boolean
  steps?: Step[]
}

export interface FormSectionProps extends Section {
  fieldsClassName: string
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  files?: FileState[]
  handleFiles?: (file: File) => void
  customFields?: CustomField
  children?: React.ReactNode
}

export interface UploadFileProps {
  text?: string
  id?: string
  file: FileState
  handleSelectedFile: (e: File) => void
  props: Record<string, string | boolean>
}

export type UseFile = Pick<UploadFileProps, 'file' | 'handleSelectedFile'>

export interface PopupProps {
  toggleModal?: (val?: boolean) => void
  children: React.ReactNode
}

export interface ModalProps {
  isOpen: boolean
  toggle: (value?: boolean) => void
  children: React.ReactNode
  onConfirm: () => any
  onCancel?: () => any
  className?: string
  confirmText?: string
  hasConfirmButton?: boolean
}

export interface ErrorObject {
  message: string
  statusCode: ErrorCode
}

export interface EnterpriseContextType {
  enterprises: Enterprise[]
  isLoading: boolean
  setInitialEnterprises: (enterprises: Enterprise[]) => void
  addEnterprise: (enterprise: Enterprise) => void
  updateEnterprise: (id: string, enterprise: Enterprise) => void
  deleteEnterprise: (id: string) => void
}

export interface UserContextType {
  users: User[]
  isLoading: boolean
  setInitialUsers: (users: User[]) => void
  addUser: (user: User) => void
  deleteUser: (id: string) => void
  isAddingUser: boolean
}

export interface DepartmentContextType {
  departments: Department[]
  isLoading: boolean
  setInitialDepartments: (departments: Department[]) => void
  addDepartment: (department: Department) => void
  updateDepartment: (department: Department) => void
  deleteDepartment: (id: string) => void
}

export interface EntepriseContextProviderProps {
  children: React.ReactNode
}

export type UserContextProviderProps = EntepriseContextProviderProps

export type DepartmentContextProviderProps = EntepriseContextProviderProps

export type DeleteEnterpriseProps = Omit<
ModalProps,
'children' | 'onConfirm'
> & {
  enterpriseId: string
}

export interface LinkButtonProps {
  href: string
  children: React.ReactNode
  className?: string
}

export interface Department {
  name: string
  subDepartments: SubDepartment[]
  enterprise: string
  createdAt: Date
  id: string
}

export interface SubDepartment {
  name: string
  subDepartments: SubDepartment[]
}

export interface SubDepartmentWithId extends SubDepartment {
  id: string
  subDepartments: SubDepartmentWithId[]
}

export interface AppState {
  enterprises: Enterprise[]
  users: User[]
  departments: Department[]
  department: DepartmentStateWithId
}

export interface DepartmentState {
  name: string
  subDepartments: SubDepartment[]
}

export interface DepartmentStateWithId extends DepartmentState {
  subDepartments: SubDepartmentWithId[]
  id?: string
  createdAt?: Date
  enterprise?: string
}

export interface CreateEnterpriseDTO {
  name: string
  image?: string
  turn: string
  address: string
  telephone: string
  amountOfEmployees: AmountOfEmployees
  admins: string[]
  departments: string[]
}

export enum AmountOfEmployees {
  'OneToTen' = '1-10',
  'elevenToTwentyFive' = '11-25',
  'TwentySixToFifty' = '26-50',
  'FiftyPlus' = '50+',
}

export interface SearchBarProps {
  title?: string | undefined
  handleData: (filter: string) => void
  filter: string
  setFilter: (filter: string) => void
}

export interface AddUsersProps {
  addedUsers: User[]
  addUser: (user: User) => void
  removeUser: (user: User) => void
}

export type AddUsersWrapperProps = Pick<AddUsersProps, 'addedUsers'> & {
  setAddedUsers: (value: SetStateAction<User[]>) => void
}

export type EditEnterpriseDTO = Partial<Omit<CreateEnterpriseDTO, 'admins'>> & {
  id?: string
  createdAt?: Date
  departments?: CreateDepartmentDTO[]
  admins?: User[]
}

export interface EnterpriseFormProps {
  enterpriseToEdit?: EditEnterpriseDTO
}

export interface LoginUserDTO {
  email: string
  password: string
}

export interface FileState {
  name: string
  purpose: string
  file: File | string | undefined
  required?: boolean
}

export interface UploadFileDTO {
  fileId: string
  type: string
  purpose: string
}

export interface UserFormData {
  email: string
  name: string
  lastName: string
  password: string
  repeatPassword: string
}

export interface DepartmentListProps {
  departments: Department[]
  title: string
  enterpriseId: string
  updateDepartment: DepartmentContextType['updateDepartment']
  deleteDepartment: (id: string) => void
}

export interface LoaderProps {
  className?: string
}

export interface AddDepartmentProps {
  department: DepartmentStateWithId
  handleDepartmentChange: Dispatch<SetStateAction<DepartmentStateWithId>>
  isEditMode?: boolean
}

export interface AddSubdepartmentProps extends AddDepartmentProps {
  index: number
}

export interface ButtonIconProps {
  icon: any
  width?: number
  height?: number
  className?: string
  style?: Record<string, string | boolean>
  props?: ButtonHTMLAttributes<HTMLButtonElement>
}

export interface DepartmentPageProps {
  params: {
    departmentId: string
  }
}

export interface DepartmentAdministrationProps {
  id: string
}

export type DepartmentAdministrationSelectedView =
  | 'members'
  | 'positions'
  | 'roles'

export interface InternalLink {
  name: DepartmentAdministrationSelectedView
  label: string
  isActive: boolean
}

export interface AddRoleProps {
  isEditing: boolean
  isOpen: boolean
}

export interface Step {
  name: string
  index: number
}
export interface StepperProps {
  steps: Step[]
  currentStep: number
  nextStep: () => void
  previousStep: (index?: number) => void
  checkErrors?: (fieldsToCheck: string[]) => Promise<boolean>
  fieldNames?: string[]
}

export enum IndicatorType {
  FINANTIAL_OBJECTIVE = 'Objetivo financiero',
  MEASUREMENT = 'Calificación 1 al 10',
  MEETS_EXPECTATION = 'Cumple (sí o no)',
}

export enum IndicatorMeasurementType {
  Percentage = 'Porcentaje',
  Amount = 'Monto'
}

export interface Indicator {
  type: IndicatorType
  measurementType?: IndicatorMeasurementType
  associatedUsers: User[]
}

export interface AddIndicatorProps {
  addedIndicators: Indicator[]
}

export interface SelectFieldProps {
  name: string
  options: Option[]
  register?: UseFormRegister<any>
  props?: SelectHTMLAttributes<HTMLSelectElement>
  className?: string
}
