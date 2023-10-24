import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { loginActions } from "./loginSlice";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { status, loading, error } = useSelector((state) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 200) navigate("/table");
  }, [status, navigate]);

  function handleSubmit(e) {
    e.preventDefault();

    const user = { username, password };

    dispatch(loginActions.login({ user }));
    setUsername("");
    setPassword("");
  }

  console.log("ERROR", error);

  return (
    <>
      {loading ? (
        <h1>LOADING.....</h1>
      ) : (
        <form className={styles.form}>
          <label className={styles.label}>
            Username
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className={styles.btn} onClick={handleSubmit}>
            Sign in
          </button>
        </form>
      )}
    </>
  );
}

export default LoginForm;
