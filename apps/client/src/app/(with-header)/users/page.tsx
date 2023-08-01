import { List } from "@components/index";
import userService from "@services/users";
import { type User, CardType } from "@/types";

export default async function UsersPage(): Promise<JSX.Element> {
  const users = await userService.getAll();

  return (
    <div>
      <List
        list={users as User[]}
        newElement="Nuevo usuario"
        newElementPage={"/admin-panel/users/new"}
        listEmptyMessage="No existen usuarios registrados..."
        typeOfCard={CardType.UserCard}
      />
    </div>
  );
}
