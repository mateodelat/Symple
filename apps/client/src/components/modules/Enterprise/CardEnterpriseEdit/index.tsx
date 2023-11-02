import { useRouter } from 'next/navigation'

import VerticalButton from '@components/shared/VerticalButton'
import {
  CardEnterprise
} from '@components/modules/Enterprise/'
import { type CardEnterpriseEditProps } from '@/types'
import { EnterpriseMenuItems } from '@/constants/EnterpriseMenuItems'

export default function CardEnterpriseEdit ({
  element
}: CardEnterpriseEditProps): JSX.Element {
  const router = useRouter()

  const handleCardClick = (): void => {
    router.push(`/admin-panel/enterprise/${element.id}`)
  }

  return (
    <CardEnterprise
      element={element}
      onClick={handleCardClick}
    >
      <VerticalButton
        elementId={element.id}
        menuItems={EnterpriseMenuItems}
      />
    </CardEnterprise>
  )
}
