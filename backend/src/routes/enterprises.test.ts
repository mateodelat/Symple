import { describe, test, beforeEach, afterAll, expect } from 'vitest'
import { server } from '../index'
import mongoose from 'mongoose'
import Enterprise from '../models/Enterprise'
import { api, enterprises, getEnterprises } from '../utils/tests/helpers'

describe('Entreprises', () => {
  beforeEach(async () => {
    await Enterprise.deleteMany({})

    const enterprise1 = new Enterprise(enterprises[0])
    await enterprise1.save()

    const enterprise2 = new Enterprise(enterprises[1])
    await enterprise2.save()

    const enterprise3 = new Enterprise(enterprises[2])
    await enterprise3.save()
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

  test('one enterprise is called "Empresa 1"', async () => {
    const { contents } = await getEnterprises()
    expect(contents[0]).toContain('Empresa 1')
  })

  test('a valid enterprise can be created', async () => {
    const initialEnterprises = await Enterprise.find({})
    const enterprise = {
      content: 'Empresa 4',
      important: true
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

  test('a enterprise without content cannot be created', async () => {
    const initialEnterprises = await Enterprise.find({})
    const enterprise = {
      content: '',
      important: true
    }
    await api
      .post('/api/enterprises')
      .send(enterprise)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const afterEnterprises = await Enterprise.find({})

    expect(afterEnterprises).toHaveLength(initialEnterprises.length)
  })

  afterAll(async () => {
    await mongoose.connection.close()
    server.close()
  })
})
