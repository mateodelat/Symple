import { enterpriseService } from "@services/index";
import Card from "../Card";
import styles from './List.module.scss'

export default async function EnterprisesList(): Promise<JSX.Element> {
  const enterprises = await enterpriseService.getAll();
  return (
    <div className={styles.list}>
      {enterprises.map((enterprise) => (
        <Card enterprise={enterprise} key={enterprise.id} />
      ))}
    </div>
  );
}
