import { CardUserEdit, List } from "@components/index";
import userService from "@services/users";

export default async function UsersPage(): Promise<JSX.Element> {
  const users = await userService.getAll();

  return (
    <div>
      <List
        list={users}
        newElement="Nuevo usuario"
        newElementPage={"/admin-panel/users/new"}
        listEmptyMessage="No existen usuarios registrados..."
        canCreateElement
        Card={CardUserEdit}
      />
    </div>
  );
}
