import React, { createContext, useState } from "react";
import useAuth from "../hooks/useAuth";

interface ModalProviderProps {
  children: React.ReactNode;
}

export interface ModalContextData {
  newOrderModal: boolean;
  setNewOrderModal: (option: boolean) => void;
  userManagerModal: boolean;
  setUserManagerModal: (option: boolean) => void;
  roleManagerModal: boolean;
  setRoleManagerModal: (option: boolean) => void;
  closeAll: () => void;
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [newOrderModal, setNewOrderModal] = useState(false);
  const [userManagerModal, setUserManagerModal] = useState(false);
  const [roleManagerModal, setRoleManagerModal] = useState(false);
  const { isAuth } = useAuth();

  function closeAll() {
    if (!isAuth) {
      return;
    }
    setNewOrderModal(false);
    setUserManagerModal(false);
    setRoleManagerModal(false);
    document.body.style.overflowY = "scroll";
  }

  return (
    <ModalContext.Provider
      value={{
        newOrderModal,
        setNewOrderModal,
        userManagerModal,
        setUserManagerModal,
        roleManagerModal,
        setRoleManagerModal,
        closeAll,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
