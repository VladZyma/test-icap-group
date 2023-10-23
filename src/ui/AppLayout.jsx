import styles from "./AppLayout.module.css";

function AppLayout({ children }) {
  return <div className={styles.app}>{children}</div>;
}

export default AppLayout;
