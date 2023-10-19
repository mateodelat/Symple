import { type Section } from '@/types'
import { formErrors } from '@/constants/Errors'
import styles from '@styles/RoleForm.module.scss'
import * as yup from 'yup'

const { required } = formErrors

export const roleSchema = yup.object({
  detailsName: yup.string().required(required),
  detailsObjective: yup.string().required(required),
  indicators: yup.string().required(required),
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
        style: { width: '100%' }
      },
      {
        name: 'detailsObjective',
        label: 'Objetivo del rol',
        placeholder: 'Breve descripción del rol',
        style: { width: '100%' },
        elementType: 'textarea'
      }
    ],
    className: styles.details
  },
  {
    title: {
      name: 'Indicadores',
      as: 'h1'
    },
    fields: [
      {
        name: 'indicators',
        label: 'Indicadores',
        placeholder: 'Nombre',
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

export const roleSteps = [
  { index: 0, name: 'Detalles' },
  { index: 1, name: 'Indicadores' },
  { index: 2, name: 'Entregables' },
  { index: 3, name: 'Funciones' }
]
