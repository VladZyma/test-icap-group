import { createContext, useContext, useState, cloneElement } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { userActions } from "../user/userSlice";
import useOutsideClick from "./useOutsideClick";

import styles from "./Modal.module.css";

const ModalContext = createContext();

export default function Modal({ children, user = null }) {
  const [openName, setOpenName] = useState("");

  const dispatch = useDispatch();

  const openModal = setOpenName;
  const closeModal = () => {
    setOpenName("");
    if (user) dispatch(userActions.setUserForUpdate(null));
  };

  return (
    <ModalContext.Provider
      value={{ openName, openModal, closeModal, dispatch, user }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: modalWindowName }) {
  const { openModal, dispatch, user } = useContext(ModalContext);

  function handleClick() {
    openModal(modalWindowName);
    if (user) dispatch(userActions.setUserForUpdate(user));
  }

  return (
    <button className={styles.openBtn} onClick={handleClick}>
      {children}
    </button>
  );
}

function Window({ children, name }) {
  const { openName, closeModal } = useContext(ModalContext);

  const ref = useOutsideClick(closeModal);

  if (name !== openName) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div ref={ref} className={styles.modal}>
        <button className={styles.btn} onClick={closeModal}>
          ❌
        </button>
        {cloneElement(children, { onCloseModal: closeModal })}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
