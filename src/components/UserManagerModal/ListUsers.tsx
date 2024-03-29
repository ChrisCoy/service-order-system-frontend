import { BsFileEarmarkPerson as PersonIcon } from "react-icons/bs";
import { FiEdit as EditIcon } from "react-icons/fi";
import { AiOutlineDelete as DeleteIcon, AiOutlineMail as EmailIcon } from "react-icons/ai";
import { IoPersonAddOutline as AddUserIcon } from "react-icons/io5";
import { useEffect, useState } from "react";
import type { IUser, IUserComplete } from "../../types/UserTypes";
import useAxios from "../../hooks/useAxios";
import useToast from "../../hooks/useToast";

interface IListUsersProps {
  users: IUserComplete[];
  setUsers: (value: IUserComplete[]) => void;
  setCrudState: (option: "CREATE" | "VIEW" | "UPDATE" | "LIST") => void;
  setSelectedUser: (option: IUserComplete) => void;
}

export default function ListUsers({
  setCrudState,
  setSelectedUser,
  users,
  setUsers,
}: IListUsersProps) {
  let contZebra = 0;
  const { AxiosQuery } = useAxios();
  const Toast = useToast();

  function handleEditButton(_id?: string) {
    const selectedUser = users.find((user) => user._id === _id) as IUserComplete;
    setCrudState("UPDATE");
    setSelectedUser(selectedUser);
  }

  function handleViewButton(_id?: string) {
    const selectedUser = users.find((user) => user._id === _id) as IUserComplete;
    setCrudState("VIEW");
    setSelectedUser(selectedUser);
  }

  function handleRemoveButton(_id?: string) {
    AxiosQuery(`user/remove/${_id}`).then(({ status }) => {
      if (status !== 200) {
        Toast.error("Error!");
        return;
      }

      Toast.info("Success!");
      AxiosQuery("/user/list").then(({ data }) => {
        setUsers(data.userList);
      });
    });
  }

  return (
    <>
      <div className="userslist-title">
        <button className="create-new-user" onClick={() => setCrudState("CREATE")}>
          <p>Criar Novo Usuário</p>
          <span>
            <AddUserIcon />
          </span>
        </button>
        <h2>Usuários Registrados</h2>
      </div>
      <div className="user-item-title">
        <div className="user-name">
          <PersonIcon />
          <strong>Nome</strong>
        </div>

        <div className="user-email">
          <EmailIcon />
          <strong>Email/usuário</strong>
        </div>
        <span className="item-buttons">
          <strong>Ações</strong>
        </span>
      </div>

      {users.map((user) => {
        contZebra++;
        return (
          <div className={`user-item ${contZebra % 2 && "zebra-item"}`} key={contZebra}>
            <div
              className="item-info"
              onClick={() => {
                handleViewButton(user._id);
              }}
            >
              <div className="user-name">
                <p>{user.name}</p>
              </div>
              <div className="user-email">
                <p>{user.email}</p>
              </div>
            </div>
            <span className="item-buttons">
              <EditIcon
                onClick={() => {
                  handleEditButton(user._id);
                }}
              />
              <DeleteIcon
                onClick={() => {
                  handleRemoveButton(user._id);
                }}
              />
            </span>
          </div>
        );
      })}
    </>
  );
}
