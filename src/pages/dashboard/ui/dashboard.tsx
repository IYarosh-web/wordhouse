import { Outlet, useLocation } from "react-router";
import { locationChanged } from "app/model";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import { Desk } from "features/desk";
import { $wordStore } from "entities/word";
import {motion} from "motion/react";

import styles from './dashboard.module.css';

function DashboardPage() {
  const location = useLocation();

  const [changeLocation, words] = useUnit([locationChanged, $wordStore]);

  useEffect(() => {
    changeLocation(location.pathname);
  }, [location, changeLocation]);

  return (
    <div className="h-full w-full">
      <motion.div
        initial={{
          top: "calc(-100% - 80px)"
        }}
        animate={{
          top: 0
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 190,
          restDelta: 0.1,
        }}
        className="relative"
      >
        <Desk words={words} />
      </motion.div>
      <Outlet />
    </div>
  );
}

export { DashboardPage };
