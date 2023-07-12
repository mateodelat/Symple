export interface IEnterprise {
  name: string
  image?: string
  turn: string
  telephone: string
  address: string
  amountOfEmployees: AmountOfEmployees
  date: string
  id: string
}

export type IEnterpriseNew = Omit<IEnterprise, 'id' | 'date'> & { errors: string[] }
