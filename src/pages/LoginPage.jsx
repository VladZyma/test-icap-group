import LoginForm from "../features/login/LoginForm";

import styles from "./LoginPage.module.css";

function LoginPage() {
  return (
    <div className={styles.login}>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
