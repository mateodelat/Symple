import { CardType } from "@/types";
import { List } from "@components/index";
import { enterpriseService } from "@services/index";

export default async function EnterprisesPage(): Promise<JSX.Element> {
  const enterprises = await enterpriseService.getAll();

  return (
    <div>
      <List
        list={enterprises}
        newElement="Nueva empresa"
        listEmptyMessage="No cuentas con empresas a tu cargo..."
        typeOfCard={CardType.EnterpriseCard}
      />
    </div>
  );
}
