import { AmountOfEmployees } from '../enums'
import { IEnterpriseNew } from '../types'

const errors: string[] = []

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    errors.push('Nombre incorrecto o no encontrado')
    return ''
  }
  return nameFromRequest
}

const parseImage = (imageFromRequest: any): string => {
  if (imageFromRequest === '') return ''
  if (!isString(imageFromRequest)) {
    errors.push('Imagen incorrecta o no encontrada')
    return ''
  }
  return imageFromRequest
}

const parseTurn = (turnFromRequest: any): string => {
  if (!isString(turnFromRequest)) {
    errors.push('Giro incorrecto o no encontrado')
    return ''
  }
  return turnFromRequest
}

const parseTelephone = (telephoneFromRequest: any): string => {
  if (!isString(telephoneFromRequest)) {
    errors.push('Teléfono de contacto incorrecto o no encontrado')
    return ''
  }
  return telephoneFromRequest
}

const parseAddress = (addressFromRequest: any): string => {
  if (!isString(addressFromRequest)) {
    errors.push('Dirección incorrecta o no encontrada')
    return ''
  }
  return addressFromRequest
}

const parseAmountOfEmployees = (amountOfEmployeesFromRequest: any): AmountOfEmployees => {
  if (!isString(amountOfEmployeesFromRequest) || !isAmountOfEmployees(amountOfEmployeesFromRequest)) {
    errors.push('Número de empleados incorrecto o no encontrada')
  }
  return amountOfEmployeesFromRequest
}

const isString = (string: string | object): boolean => {
  return typeof string === 'string' || string instanceof String
}

const isAmountOfEmployees = (param: any): boolean => {
  return Object.values(AmountOfEmployees).includes(param)
}

export const toNewEnterprise = (object: any): IEnterpriseNew => {
  const newEnterprise: IEnterpriseNew = {
    name: parseName(object.name),
    image: (object.image !== undefined ? parseImage(object.image) : ''),
    turn: parseTurn(object.turn),
    telephone: parseTelephone(object.telephone),
    address: parseAddress(object.address),
    amountOfEmployees: parseAmountOfEmployees(object.amountOfEmployees),
    errors
  }

  return newEnterprise
}
