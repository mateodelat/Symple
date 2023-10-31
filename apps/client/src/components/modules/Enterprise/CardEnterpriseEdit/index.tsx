import { useRouter } from 'next/navigation'

import {
  VerticalButton,
  Popup
} from '@components/shared/'
import {
  CardEnterprise,
  DeleteEnterprise
} from '@components/modules/Enterprise/'
import { useToggle } from '@hooks/index'
import { type CardEnterpriseEditProps, type Enterprise } from '@/types'
import styles from './CardEntepriseEdit.module.scss'
import Link from 'next/link'

export default function CardEnterpriseEdit ({
  element
}: CardEnterpriseEditProps): JSX.Element {
  const router = useRouter()

  const handleCardClick = (enterprise: Enterprise): void => {
    router.push(`/admin-panel/enterprise/${enterprise.id}`)
  }

  const { value: isPopupOpen, toggle: togglePopup } = useToggle()
  const { value: isModalOpen, toggle: toggleModal } = useToggle()
  return (
    <CardEnterprise
      element={element}
      onClick={() => {
        handleCardClick(element)
      }}
    >
      <VerticalButton onClick={togglePopup} className={styles.vertical} />
      {isPopupOpen && (
        <>
          <Popup togglePopup={togglePopup}>
            <Link
              className={styles.action}
              href={`/admin-panel/enterprise/${element.id}/edit`}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              Editar
            </Link>
          </Popup>

        </>
      )}
      {isModalOpen && (
        <DeleteEnterprise
          isOpen={isModalOpen}
          toggle={toggleModal}
          enterpriseId={element.id}
        />
      )}
    </CardEnterprise>
  )
}
