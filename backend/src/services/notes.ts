import Enterprise from '../models/Enterprise'
import { IEnterprise } from '../types'

export const getAll = async (): Promise<IEnterprise[]> => await Enterprise.find({})
