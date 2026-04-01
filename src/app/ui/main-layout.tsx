import { Outlet } from "react-router";
import styles from "./main-layout.module.css";
import { AddWordModal } from "features/add-word";
import { Header } from "features/header";

export function MainLayout() {
  return (
    <div className={`${styles.wrapper} font-sour-gummy`}>
      <Header />
      <Outlet />
      <AddWordModal />
    </div>
  );
}
