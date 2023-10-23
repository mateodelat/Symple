import { IndicatorMeasurementType, IndicatorType, type Option, type Section } from '@/types'
import { formErrors } from '@/constants/Errors'
import styles from '@styles/RoleForm.module.scss'
import * as yup from 'yup'

const { required, minNumber, maxNumber } = formErrors

export const roleSchema = yup.object().shape({
  detailsName: yup.string().required(required),
  detailsObjective: yup.string().required(required),
  indicatorName: yup.string().required(required),
  indicatorSelect: yup.string().required(required),
  measurementSelect: yup.string(),
  measurementValue: yup.number().when(['measurementSelect'], (values: any, schema) => {
    const measurementSelect = values[0]
    switch (measurementSelect) {
      case IndicatorMeasurementType.PERCENTAGE:
        return schema
          .min(0, minNumber)
          .max(100, maxNumber)
          .test(
            'is-decimal',
            'El porcentaje debe de tener máximo 2 decimales',
            (val: any) => {
              if (val !== undefined) {
                return /^\d+(\.\d{0,2})?$/.test(val)
              }
              return true
            }
          )
          .required('Must be a percentage')
      case IndicatorMeasurementType.AMOUNT:
        return schema.required('Must be an amount')
      default:
        return schema
    }
  }),

  deliverables: yup.string().required(required),
  functions: yup.string().required(required)
})

export const roleSections: Section[] = [
  {
    title: {
      name: 'Detalles',
      as: 'h1',
      style: { display: 'none' }
    },
    fields: [
      {
        name: 'detailsName',
        label: 'Nombre',
        placeholder: 'Nombre',
        style: { width: '100%', alignItems: 'flex-start' }
      },
      {
        name: 'detailsObjective',
        label: 'Objetivo del rol',
        placeholder: 'Breve descripción del rol',
        style: { width: '100%', alignItems: 'flex-start' },
        elementType: 'textarea'
      }
    ],
    className: styles.details
  },
  {
    title: {
      name: 'Indicadores',
      as: 'h1',
      style: { display: 'none' }
    },
    fields: [
      {
        name: 'addIndicators',
        elementType: 'custom',
        style: { width: '100%' }
      },
      {
        name: 'indicatorName',
        elementType: 'none',
        style: { width: '100%' }
      },
      {
        name: 'indicatorSelect',
        elementType: 'none',
        style: { width: '100%' }
      },
      {
        name: 'measurementSelect',
        elementType: 'none',
        style: { width: '100%' }
      },
      {
        name: 'measurementValue',
        elementType: 'none',
        style: { width: '100%' }
      }
    ],
    className: styles.details
  },
  {
    title: {
      name: 'Entregables',
      as: 'h1'
    },
    fields: [
      {
        name: 'deliverables',
        label: 'Entregables',
        placeholder: 'Nombre',
        style: { width: '100%' }
      }
    ],
    className: styles.details
  },
  {
    title: {
      name: 'Funciones',
      as: 'h1'
    },
    fields: [
      {
        name: 'functions',
        label: 'Funciones',
        placeholder: 'Nombre',
        style: { width: '100%' }
      }
    ],
    className: styles.details
  }
]

export const roleInitialValues = {
  detailsName: '',
  detailsObjective: '',
  deliverables: '',
  functions: ''
}

export const roleSteps = [
  { index: 0, name: 'Detalles' },
  { index: 1, name: 'Indicadores' },
  { index: 2, name: 'Entregables' },
  { index: 3, name: 'Funciones' }
]

export const roleIndicatorOptions: Option[] = Object.values(IndicatorType).map((value) => (
  {
    id: value,
    label: value
  }
))

export const roleMeasurementOptions: Option[] = Object.values(IndicatorMeasurementType).map((value) => (
  {
    id: value,
    label: value
  }
))
