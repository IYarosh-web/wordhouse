import { Link, useLocation } from "react-router-dom";

import { forwardRef } from "react";

import styles from "./styles.module.css";

function _Navbar(_, ref: React.RefObject<HTMLElement>) {
  const location = useLocation();

  return (
    <nav className="outline-offset-4" ref={ref} tabIndex={0}>
      <ul className="flex gap-2 px-6">
        <li>
          <Link className={`${styles.dashboard} ${styles.item} ${location.pathname.startsWith("/dashboard") ? styles.active : ""}`} to="/dashboard" />
        </li>
        <li>
          <Link className={`${styles.widgets} ${styles.item} ${location.pathname.startsWith("/widgets") ? styles.active : ""}`} to="/widgets" />
        </li>
        <li>
          <Link className={`${styles.settings} ${styles.item} ${location.pathname.startsWith("/settings") ? styles.active : ""}`} to="/settings" />
        </li>
      </ul>
    </nav>
  )
}

const Navbar = forwardRef(_Navbar);

export { Navbar };