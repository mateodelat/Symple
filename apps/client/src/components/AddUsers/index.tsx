"use client";

import { Card, List, SearchBar } from "@components/index";
import { useUserContext } from "@contexts/User/context";
import styles from "./AddUsers.module.scss";
import { CardType, type AddUsersProps } from "@/types";

export default function AddUsers({
  addedUsers,
  addUser,
  removeUser,
}: AddUsersProps): JSX.Element {
  const { users: data } = useUserContext();

  const users = data.filter((user) => {
    return (
      user.role !== "admin" &&
      !addedUsers.some((addedUser) => addedUser.id === user.id)
    );
  });

  return (
    <article className={styles.addUsers}>
      <span>
        <strong>Agregar miembros</strong>
      </span>
      <div className={styles.addUsers_addedList}>
        {addedUsers.length === 0 && <h2>No se han asignado usuarios.</h2>}
        {addedUsers.map((user) => (
          <Card
            type={CardType.UserCard}
            element={user}
            key={user.id}
            onClick={() => {
              removeUser(user);
            }}
          />
        ))}
      </div>
      <SearchBar title="Nombre / Correo del usuario registrado" />
      <List
        list={users}
        canCreateElement={false}
        listEmptyMessage={
          data.length === 0
            ? "No existen usuarios registrados..."
            : "No hay usuarios restantes..."
        }
        typeOfCard={CardType.UserCard}
        className={styles.addUsers_list}
        cardClassName={styles.addUsers_list_card}
        cardOnClick={addUser}
      />
    </article>
  );
}
