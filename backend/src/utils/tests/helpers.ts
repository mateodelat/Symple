import supertest from 'supertest'
import { app } from '../../index'
import { IEnterprise } from '../../types'

const api = supertest(app)

const enterprises = [
  {
    content: 'Empresa 1',
    important: true
  },
  {
    content: 'Empresa 2',
    important: true
  },
  {
    content: 'Empresa 3',
    important: false
  }
]

const getEnterprises = async () => {
  const response = await api.get('/api/enterprises')
  return { contents: response.body.map((e: IEnterprise) => e.content), response }
}

export { api, enterprises, getEnterprises }
