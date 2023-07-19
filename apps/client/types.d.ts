export interface Field {
  name: string
  type: string
  placeholder: string
  required: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type FieldProps = Omit<FieldProps, 'value' | 'onChange'>

export interface User {
  id: number
  name: string
  lastName: string
  email: string
  password: string
}

export type UserState = Omit<User, 'id' | 'name' | 'lastName'>

export interface AppState {
  user: UserState
}
