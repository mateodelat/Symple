'use client'

import { type DeleteEnterpriseProps } from '@/types'
import Modal from '@components/shared/Modal'
import enterpriseService from '@services/enterprises'
import { useEnterpriseContext } from '@contexts/Enterprise/context'
import { toast } from 'react-hot-toast'

export default function DeleteEnterprise ({
  isOpen,
  toggle,
  enterpriseId
}: DeleteEnterpriseProps): JSX.Element {
  const { deleteEnterprise } = useEnterpriseContext()

  const deleteElement = async (): Promise<void> => {
    try {
      const response = await enterpriseService.deleteOne(enterpriseId)
      toggle()
      deleteEnterprise(enterpriseId)
      toast.success(response.message)
    } catch (e: any) {
      toast.error(e.message)
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} onConfirm={deleteElement}>
      <h2>Alerta</h2>
      <p>
        ¿Seguro que quieres borrar la empresa?, Este cambio no se puede
        deshacer.
      </p>
    </Modal>
  )
}
