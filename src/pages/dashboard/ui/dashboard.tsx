import { Outlet, useLocation } from "react-router";
import { locationChanged } from "app/model";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import { Desk } from "features/desk";
import { $wordStore } from "entities/word";
import { Toolbar } from "./toolbar";

import styles from './dashboard.module.css';

function DashboardPage() {
  const location = useLocation();

  const [changeLocation, words] = useUnit([locationChanged, $wordStore]);

  useEffect(() => {
    changeLocation(location.pathname);
  }, [location, changeLocation]);

  return (
    <>
      <Desk words={words} />
      <div className={styles.toolbarWrapper}>
        <Toolbar />
      </div>
      <Outlet />
    </>
  );
}

export { DashboardPage };
