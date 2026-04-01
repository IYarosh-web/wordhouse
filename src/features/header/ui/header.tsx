import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";

import styles from './header.module.css';

export function Header() {
  return (
    <div className={styles.wrapper + " flex gap-2 items-center justify-center border-b-2"}>
      <Toolbar />
      <Navbar />
    </div>
  )
}