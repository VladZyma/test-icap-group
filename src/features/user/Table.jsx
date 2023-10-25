import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableRow from "./TableRow";
import Modal from "../modal/Modal";
import UserForm from "./UserForm";
import Pagination from "./Pagination";

import { userActions } from "./userSlice";

import styles from "./Table.module.css";

function Table() {
  const { users, loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAllUsers());
  }, [dispatch]);

  function handleDeleteUser(id) {
    dispatch(userActions.deleteUserById({ id }));
  }

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users?.results?.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>
              <Modal>
                <Modal.Open opens="userForm">CREATE USER</Modal.Open>
                <Modal.Window name="userForm">
                  <UserForm />
                </Modal.Window>
              </Modal>
            </td>
          </tr>
        </tfoot>
      </table>
      <Pagination
        nextPage={users.next}
        prevPage={users.previous}
        total={users.count}
        dispatch={dispatch}
      />
    </>
  );
}

export default Table;
