import { useState } from "react";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const user = { username, password };
    console.log(user);
  }

  return (
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
  );
}

export default LoginForm;
