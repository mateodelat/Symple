import type React from 'react'
import { type ErrorCode } from './constants/Errors'
import type * as yup from 'yup'
import {
  type RefObject,
  type Dispatch,
  type SetStateAction,
  type ButtonHTMLAttributes,
  type SelectHTMLAttributes,
  type InputHTMLAttributes
} from 'react'
import { type FieldErrors, type UseFormRegister } from 'react-hook-form'
import { type DraggableProvidedDragHandleProps } from '@hello-pangea/dnd'

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
  elementType?: 'select' | 'file' | 'custom' | 'textarea' | 'none'
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
  roleRestriction?: string
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
  style?: React.CSSProperties
  props?: object
}

export interface VerticalButtonProps {
  actions?: Record<string, any>
  menuItems: MenuItem[]
  elementId: string
}

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
  isBlocked: boolean
  setIsBlocked: (value: boolean) => void
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
  menuItems: MenuItem[]
  togglePopup: (val?: boolean) => void
  actions?: Record<string, any>
  elementId: string
}

export interface ModalProps {
  isOpen: boolean
  toggle: (value?: boolean) => void
  children: React.ReactNode
  showCancelConfirmation?: boolean
  onConfirm?: () => any
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

export interface Role {
  id: string
  name: string
  department: string
  indicators: Indicator[]
  deliverables: Deliverable[]
  functions: FunctionState[]
}

export interface RoleContextType {
  roles: Role[]
  department: string
  isLoading: boolean
  handleDepartmentChange: (department: string) => void
  setInitialRoles: (roles: Role[]) => void
  addRole: (role: Role) => void
  updateRole: (role: Role) => void
  deleteRole: (id: string) => void
}

export interface EntepriseContextProviderProps {
  children: React.ReactNode
}

export type UserContextProviderProps = EntepriseContextProviderProps

export type DepartmentContextProviderProps = EntepriseContextProviderProps

export type RoleContextProviderProps = EntepriseContextProviderProps

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
  roles: Role[]
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
  modalClassName?: string
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
  singularLabel: string
  isActive: boolean
}

export interface AddRoleProps {
  selectedElement: Role | null
  isOpen: boolean
  department: string
  toggle: (value?: boolean) => void
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
  FINANCIAL_OBJECTIVE = 'Objetivo financiero',
  MEASUREMENT = 'Calificación 1 al 10',
  MEETS_EXPECTATION = 'Cumple (sí o no)',
}

export enum IndicatorMeasurementType {
  PERCENTAGE = 'Porcentaje',
  AMOUNT = 'Monto',
}

export interface Indicator {
  name: string
  type: IndicatorType
  measurementType?: IndicatorMeasurementType
  amount?: string
  associatedUsers: User[]
  index: number
}

export interface AddIndicatorProps {
  addedIndicators: Indicator[]
  addedUsers: IndicatorUserState[]
  setAddedUsers: Dispatch<SetStateAction<IndicatorUserState[]>>
  addIndicator: () => void
  updateIndicator: (index: number, indicator: Indicator) => void
  deleteIndicator: (index: number) => void
  setIsBlocked: (value: boolean) => void
}

export interface SelectFieldProps {
  name: string
  options: Option[]
  register?: UseFormRegister<any>
  props?: SelectHTMLAttributes<HTMLSelectElement>
  className?: string
}

export type AddIndicatorFormProps = Omit<
AddIndicatorProps,
'addedIndicators' | 'addIndicator'
> & {
  canBeDeleted: boolean
  indicator: Indicator
  index: number
}

export interface AddIndicatorFormErrors {
  indicatorName: string
  indicatorMeasurementValue: string
}

export interface InputFieldProps {
  showLabel?: boolean
  params: InputHTMLAttributes<HTMLInputElement>
  showError?: boolean
  error?: string
  errorClassName?: string
  labelClassName?: string
}

export interface IndicatorUserState {
  index: number
  addedUsers: User[]
}

export interface FormRef {
  reset: () => void
  isBlocked: boolean
}

export interface Deliverable {
  name: string
  index: number
}

export interface AddDeliverableProps {
  addedDeliverables: Deliverable[]
  addDeliverable: () => void
  updateDeliverable: (index: number, deliverable: Deliverable) => void
  deleteDeliverable: (index: number) => void
  setIsBlocked: (value: boolean) => void
}

export interface AddRoleNameProps {
  value: string
  updateRoleName: (value: string) => void
  setIsBlocked: (value: boolean) => void
}
export interface AddDeliverableFormProps {
  canBeDeleted: boolean
  index: number
  deliverable: Deliverable
  updateDeliverable: (index: number, value: Deliverable) => void
  deleteDeliverable: (index: number) => void
  setIsBlocked: (value: boolean) => void
}

export interface UseCheckErrorsProps {
  fields: Record<string, string>
}

export interface UseCheckErrors {
  errors: Record<string, string>
  handleErrors: (
    name: string,
    value: string,
    isNumber: boolean,
    isPercentage: boolean,
  ) => void
}

export interface FunctionState extends Deliverable {}
export interface AddDeliverablesFormProps {
  addedDeliverables: Deliverable[]
}

export interface AddFunctionProps {
  addedFunctions: FunctionState[]
  addFunction: () => void
  updateFunction: (index: number, functionState: FunctionState) => void
  deleteFunction: (index: number) => void
  setIsBlocked: (value: boolean) => void
}

export interface AddFunctionFormProps {
  canBeDeleted: boolean
  index: number
  functionState: FunctionState
  updateFunction: (index: number, value: FunctionState) => void
  deleteFunction: (index: number) => void
  setIsBlocked: (value: boolean) => void
}

export interface DraggableInputProps {
  dragHandleProps: DraggableProvidedDragHandleProps
  value: string | number
  canBeDeleted: boolean
  handleUpdate: (value: string, field: string) => void
  handleErrors: any
  placeholder: string
  fieldName: string
  errorName: string
  deleteElement: (index: number) => void
  index: number
}

type IndicatorDTO = Omit<Indicator, 'index' | 'amount'> & {
  amount?: number
}

export type CreateRoleDTO = Omit<Role, 'id' | 'indicators'> & {
  indicators: IndicatorDTO[]
}

export type EditRoleDTO = Partial<CreateRoleDTO>

export enum LengthType {
  MEMBERS = 'members',
  POSITIONS = 'positions',
  ROLES = 'roles',
}

export interface MenuItem {
  id: string
  icon?: string
  label: string
  isLink: boolean
  navigate?: string
}
export interface CardEditProps {
  cardClassName?: string
  children: React.ReactNode
  menuItems: MenuItem[]
  onClick?: (values?: any) => any
  actions: Record<string, any>
  elementId: string
}

export interface AccordionListProps {
  data: Role[]
  cardType: 'role' | 'position' | 'member'
  menuItems: MenuItem[]
  actions?: Record<string, any>
}

export interface CardRoleProps {
  role: Role
}
