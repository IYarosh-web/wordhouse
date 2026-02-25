import { Button } from "shared/ui";

import styles from './toolbar.module.css';
import { useUnit } from "effector-react";
import { addWordClicked } from "features/desk/model";

export function Toolbar() {
  const [addWordClick] = useUnit([addWordClicked])

  return (
    <div className={styles.wrapper}>
      <Button onClick={addWordClick}>Add word</Button>
    </div>
  )
}