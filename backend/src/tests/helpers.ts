import supertest from 'supertest'
import { app } from '../index'
import { IEnterprise } from '../types'
import { AmountOfEmployees } from '../enums'

const api = supertest(app)

const enterprises = [
  {
    name: 'Empresa 1',
    turn: 'Giro 1',
    address: 'Dirección 1',
    telephone: 'Teléfono 1',
    image: '',
    amountOfEmployees: AmountOfEmployees.oneToTen
  },
  {
    name: 'Empresa 2',
    turn: 'Giro 2',
    address: 'Dirección',
    telephone: 'Teléfono 2',
    image: 'Imagen 2',
    amountOfEmployees: AmountOfEmployees.elevenToTwentyFive
  },
  {
    name: 'Empresa 3',
    turn: 'Giro 3',
    address: 'Dirección',
    telephone: 'Teléfono 3',
    image: 'Imagen 3',
    amountOfEmployees: AmountOfEmployees.fiftyPlus
  }
]

const getEnterprises = async (): Promise<any> => {
  const response = await api.get('/api/enterprises')
  return { contents: response.body.map((e: IEnterprise) => e.name), response }
}

export { api, enterprises, getEnterprises }
