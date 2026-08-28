import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { forwardRef, PropsWithChildren } from "react";

import styles from "./styles.module.css";

const tabs = [
  { id: "Dashboard", to: "/dashboard" },
  { id: "Widgets", to: "/widgets" },
  { id: "Settings", to: "/settings" },
];

function _Navbar(_: PropsWithChildren, ref: React.ForwardedRef<HTMLElement>) {
  const { pathname } = useLocation();

  const selectedTab = tabs.findIndex(tab => pathname.startsWith(tab.to));

  return (
    <nav className="flex gap-2" tabIndex={0} ref={ref}>
      <motion.div className="w-8 h-8 border-t-8 border-amber-200 bg-white" layoutId="word" />
        {tabs.map((tab, index) => (
          <NavLink
            className={`${styles.tab} ${index === selectedTab ? styles.selected : ""} relative px-2 py-1 border-2 flex align-center justify-center capitalize`}
            key={tab.id}
            id={tab.id}
            to={tab.to}
          >
            <span>{tab.id}</span>
          </NavLink>
        ))}
    </nav>
  )
}

const Navbar = forwardRef(_Navbar);

export { Navbar };