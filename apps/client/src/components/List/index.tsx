import { Card } from "@components/index";
import styles from "./List.module.scss";
import { type CardType, type Enterprise } from "@/types";

export default async function List({
  list,
  newElement,
  listEmptyMessage,
  typeOfCard,
}: {
  list: Enterprise[];
  newElement: string;
  listEmptyMessage: string;
  typeOfCard: CardType;
}): Promise<JSX.Element> {
  return (
    <div className={styles.list}>
      <button className={styles.list_button}>{newElement}</button>
      {list.length > 0 ? (
        list.map((element) => (
          <Card element={element} key={element.id} type={typeOfCard} />
        ))
      ) : (
        <h2>{listEmptyMessage}</h2>
      )}
    </div>
  );
}
