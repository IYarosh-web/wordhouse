import { Outlet } from "react-router";
import styles from "./main-layout.module.css";

export function MainLayout() {
  return (
    <div className={styles.wrapper}>
        <div className={styles.content}>
            <Outlet />
        </div>
    </div>
  );
}