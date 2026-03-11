import { Word } from "entities/word"
import {motion} from "motion/react";

import styles from './styles.module.css';
import { useUnit } from "effector-react";
import { wordClicked } from "entities/word";

type DeskProps = {
  words: Word[];
}

export function Desk({words}: DeskProps) {
  const [openWordModal] = useUnit([wordClicked])

  return (
    <div className="p-4 flex gap-2 flex-wrap">
      {words.map((w, i) => (
        <motion.button
          className={styles.word + " outline-offset-8 shadow"}
          layoutId={w.id}
          layout={true}
          layoutCrossfade
          initial={false}
          onClick={() => openWordModal(w)}
        >
          {w.word}
        </motion.button>
      ))}
    </div>
  )
}