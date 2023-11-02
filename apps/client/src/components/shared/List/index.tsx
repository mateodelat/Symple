'use client'

import LinkButton from '@components/shared/LinkButton'
import { type ListProps } from '@/types'
import styles from './List.module.scss'

export default function List ({
  list,
  canCreateElement,
  newElement,
  newElementPage,
  listEmptyMessage,
  beforeListContent,
  afterListContent,
  Card,
  cardProps = {},
  className = ''
}: ListProps): JSX.Element {
  return (
    <section className={styles.list}>
      {canCreateElement &&
        newElementPage !== undefined &&
        newElement !== undefined && (
          <LinkButton className={styles.list_button} href={newElementPage}>
            {newElement}
          </LinkButton>
      )}
      {beforeListContent !== undefined &&
      typeof beforeListContent === 'function'
        ? beforeListContent()
        : beforeListContent}
      {list.length > 0
        ? (
        <>
          <div className={`${styles.list_wrapper} ${className}`}>
            {list.map((element) => (
              <Card key={element.id} element={element} cardProps={cardProps} />
            ))}
          </div>
        </>
          )
        : (
        <h2>{listEmptyMessage}</h2>
          )}
      {afterListContent !== undefined && typeof afterListContent === 'function'
        ? afterListContent()
        : afterListContent}
    </section>
  )
}
