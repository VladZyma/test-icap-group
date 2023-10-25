import Modal from "../modal/Modal";
import UserForm from "./UserForm";

import styles from "./TableRow.module.css";

function TableRow({ user, handleDeleteUser }) {
  const { id, name, email, birthday_date, phone_number, address } = user;

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{birthday_date}</td>
      <td>{phone_number}</td>
      <td>{address}</td>
      <td>
        <Modal user={user}>
          <Modal.Open opens="updateUserForm">UPDATE</Modal.Open>
          <Modal.Window name="updateUserForm">
            <UserForm />
          </Modal.Window>
        </Modal>
        <button className={styles.delBtn} onClick={() => handleDeleteUser(id)}>
          DELETE
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
