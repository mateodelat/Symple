import { describe, test, beforeEach, afterAll, expect } from 'vitest'
import { server } from '../index'
import mongoose from 'mongoose'
import Enterprise from '../models/Enterprise'
import { api, enterprises, getEnterprises } from './helpers'
import { IEnterprise } from '../types'
import { AmountOfEmployees } from '../enums'

describe('Entreprises', () => {
  beforeEach(async () => {
    await Enterprise.deleteMany({})

    for (const enterprise of enterprises) {
      const enterpriseObject = new Enterprise(enterprise)
      await enterpriseObject.save()
    }
  })

  test('they are returned as json', async () => {
    await api
      .get('/api/enterprises')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are three enterprises', async () => {
    const { response } = await getEnterprises()
    expect(response.body).toHaveLength(enterprises.length)
  })

  test('should have the interface as IEnterprise', async () => {
    const { response } = await getEnterprises()
    const enterprise: IEnterprise = response.body[0]

    expect(typeof enterprise.name).toBe('string')
    expect(typeof enterprise.image).toBe('string')
    expect(typeof enterprise.turn).toBe('string')
    expect(typeof enterprise.address).toBe('string')
    expect(typeof enterprise.telephone).toBe('string')
    expect(typeof enterprise.id).toBeDefined()
    expect(mongoose.isValidObjectId(enterprise.id)).toBe(true)
    expect(Object.values(AmountOfEmployees)).toContain(enterprise.amountOfEmployees)
  })

  test('one enterprise is called "Empresa 1"', async () => {
    const { contents } = await getEnterprises()
    expect(contents[0]).toContain('Empresa 1')
  })

  test('a valid enterprise can be created', async () => {
    const initialEnterprises = await Enterprise.find({})
    const enterprise = {
      name: 'Empresa 1',
      telephone: '1',
      turn: 'turno 1',
      address: 'Dirección 1',
      amountOfEmployees: '1-10'
    }
    const response = await api
      .post('/api/enterprises')
      .send(enterprise)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const afterEnterprises = await Enterprise.find({})

    expect(afterEnterprises).toHaveLength(initialEnterprises.length + 1)
    expect(afterEnterprises.find((e) => e.id === response.body.id)).toBeDefined()
  })

  test('a enterprise without some data cannot be created', async () => {
    const initialEnterprises = await Enterprise.find({})
    const enterprise = {
      name: 'Empresa 1',
      telephone: '1',
      turn: 'Giro 1'
    }
    await api
      .post('/api/enterprises')
      .send(enterprise)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const afterEnterprises = await Enterprise.find({})

    expect(afterEnterprises).toHaveLength(initialEnterprises.length)
  })

  test('a enterprise can be deleted', async () => {
    const initialEnterprises = await getEnterprises()
    const enterpriseToDelete = initialEnterprises.response.body[0]
    await api
      .delete(`/api/enterprises/${enterpriseToDelete.id}`)
      .expect(204)
      .expect('Content-Type', /application\/json/)

    const afterEnterprises = await getEnterprises()
    expect(afterEnterprises.contents).toHaveLength(initialEnterprises.contents.length - 1)
    expect(afterEnterprises.contents).not.toContain(enterpriseToDelete)
  })

  afterAll(async () => {
    await mongoose.connection.close()
    server.close()
  })
})
