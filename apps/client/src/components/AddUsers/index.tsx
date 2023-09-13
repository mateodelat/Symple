"use client";

import { useEffect, useState } from "react";

import { CardUserEdit, Modal, SearchBar, UserForm } from "@components/index";
import { useUserContext } from "@contexts/User/context";
import styles from "./AddUsers.module.scss";
import { type AddUsersProps, type User } from "@/types";
import { useToggle } from "@hooks/index";

const listEmptyMessages = {
  notFound: "No existen usuarios con el filtro ingresado.",
  noUsers: "No hay usuarios restantes.",
  noData: "No existen usuarios registrados.",
  startState: "Busca por correo, nombre o apellido a usuarios.",
};

export default function AddUsers({
  addedUsers,
  addUser,
  removeUser,
}: AddUsersProps): JSX.Element {
  const { users: data } = useUserContext();
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [message, setMessage] = useState(listEmptyMessages.startState);
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

  useEffect(() => {
    let finalMessage = "";
    if (data.length === 0) finalMessage = listEmptyMessages.noData;
    if (isFiltering && users.length === 0)
      finalMessage = listEmptyMessages.notFound;
    if (addedUsers.length > 0 && isFiltering && users.length === 0)
      finalMessage = listEmptyMessages.noUsers;
    if (!isFiltering && users.length === 0)
      finalMessage = listEmptyMessages.startState;

    setMessage(finalMessage);
  }, [filter, users, addedUsers, data]);

  return (
    <article className={styles.addUsers}>
      <h2>Agregar miembros</h2>
      <div className={styles.addUsers_addedList}>
        {addedUsers.length === 0 && <h2>No se han asignado usuarios.</h2>}
        {addedUsers.map((user) => (
          <CardUserEdit
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
      <h3>{message}</h3>
      <button
        onClick={() => {
          toggle();
        }}
        className={styles.addUsers_newMember}
        type="button"
      >
        Registrar miembro
      </button>

      {users.length > 0 &&
        users.map((user) => (
          <div key={user.id}>
            <CardUserEdit
              element={user}
              onClick={() => {
                handleAddUsers(user);
              }}
              isAdding
            />
          </div>
        ))}

      {value && (
        <Modal
          isOpen={value}
          toggle={toggle}
          onConfirm={() => {}}
          className={styles.createUser}
        >
          <UserForm />
        </Modal>
      )}
    </article>
  );
}
