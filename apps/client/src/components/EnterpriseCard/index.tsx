import Image from 'next/image'

import { Enterprise } from '@/types'

export default function EnterpriseCard ({ enterprise }: { enterprise: Enterprise }): JSX.Element {
  return (
    <article>
      <h2>{enterprise.name}</h2>
      <Image
        src={
          enterprise.image === undefined ||
          enterprise.image === ''
            ? '/placeholder.svg'
            : enterprise.image
        }
        width={100}
        height={100}
        alt={`Foto de empresa ${enterprise.name}`}
      />
    </article>
  )
}
