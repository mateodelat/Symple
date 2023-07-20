import { enterpriseService } from "@services/index";
import { EnterpriseCard } from "@components/index";

export default async function EnterprisesList(): Promise<JSX.Element> {
  const enterprises = await enterpriseService.getAll();
  return (
    <div>
      {enterprises.map((enterprise) => (
        <EnterpriseCard enterprise={enterprise} key={enterprise.id} />
      ))}
    </div>
  );
}
