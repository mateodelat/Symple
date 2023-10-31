import CardEdit from '@components/shared/CardEdit'
import styles from './AccordionList.module.scss'
import { type AccordionListProps } from '@/types'
import { CardMember, CardPosition, CardRole } from '@components/modules/Role/'

export default function AccordionList ({ data, cardType, menuItems }: AccordionListProps): JSX.Element {
  return (
    <ul className={styles.list}>
      {data.map(element => (
        <CardEdit menuItems={menuItems} key={element.id}>
          {cardType === 'member' && (
            <CardMember role={element} />
          )}
          {cardType === 'position' && (
            <CardPosition role={element} />
          )}
          {cardType === 'role' && (
            <CardRole role={element} />
          )}
        </CardEdit>
      ))}
    </ul>
  )
}
