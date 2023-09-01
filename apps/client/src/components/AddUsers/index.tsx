"use client";

import { useState } from "react";

import { Button, Card, List, Modal, SearchBar } from "@components/index";
import { useUserContext } from "@contexts/User/context";
import styles from "./AddUsers.module.scss";
import { CardType, type AddUsersProps, type User } from "@/types";
import { useToggle } from "@hooks/index";

export default function AddUsers({
  addedUsers,
  addUser,
  removeUser,
}: AddUsersProps): JSX.Element {
  const { users: data } = useUserContext();
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const { toggle, value } = useToggle();

  const handleAddUsers = (user: User): void => {
    addUser(user);
    setUsers(() => users.filter((u) => u.id !== user.id));
  };

  const handleRemoveUsers = (user: User): void => {
    removeUser(user);
    if (
      user.email.includes(filter) ||
      user.name.includes(filter) ||
      user.lastName.includes(filter)
    )
      setUsers((prev) => [...prev, user]);
  };

  const handleUsersFilter = (filter: string): void => {
    if (filter === "") {
      setIsFiltering(false);
      setUsers([]);
      return;
    }
    setIsFiltering(true);
    setUsers(() =>
      data.filter(
        (user) =>
          (user.email.includes(filter) ||
            user.name.includes(filter) ||
            user.lastName.includes(filter)) &&
          user.role !== "admin" &&
          !addedUsers.some((addedUser) => addedUser.id === user.id),
      ),
    );
  };

  const listEmptyMessages = {
    notFound: "No existen usuarios con el filtro ingresado.",
    noUsers: "No hay usuarios restantes.",
    noData: "No existen usuarios registrados.",
    startState: "Busca por correo, nombre o apellido a usuarios.",
  };

  const messageHandler = (): string => {
    if (data.length === 0) return listEmptyMessages.noData;
    if (isFiltering && users.length === 0) return listEmptyMessages.notFound;
    if (addedUsers.length > 0 && users.length === 0 && isFiltering)
      return listEmptyMessages.noUsers;
    return listEmptyMessages.startState;
  };

  return (
    <article className={styles.addUsers}>
      <h2>Agregar miembros</h2>
      <div className={styles.addUsers_addedList}>
        {addedUsers.length === 0 && <h2>No se han asignado usuarios.</h2>}
        {addedUsers.map((user) => (
          <Card
            type={CardType.UserCard}
            element={user}
            key={user.id}
            onClick={() => {
              handleRemoveUsers(user);
            }}
          />
        ))}
      </div>
      <SearchBar
        title="Nombre / Correo del usuario registrado"
        handleData={handleUsersFilter}
        filter={filter}
        setFilter={setFilter}
      />
      <Button onClick={toggle} className={styles.addUsers_newMember}>
        Registrar miembro
      </Button>
      <List
        list={users}
        canCreateElement={false}
        listEmptyMessage={messageHandler()}
        typeOfCard={CardType.UserCard}
        className={styles.addUsers_list}
        cardClassName={styles.addUsers_list_card}
        cardOnClick={handleAddUsers}
      />

      {value && (
        <Modal isOpen={value} toggle={toggle} onConfirm={() => {}}>
          test
        </Modal>
      )}
    </article>
  );
}
