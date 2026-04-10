import { NavLink } from "react-router";

import styles from './styles.module.css';

export function WidgetsList() {
  return (
    <div className="flex flex-col gap-2">
      <ul className={styles.ul}>
        <li className={styles.li}>
          <div className={`${styles.face} ${styles.front}`}>1</div>
          <div className={`${styles.face} ${styles.back}`}>2</div>
          <NavLink className="w-[150px] h-[150px] border-2 cursor-pointer br-m flex items-center justify-center shadow" to="/widgets/wordle">Wordle</NavLink>
        </li>
      </ul>
    </div>
  )
}