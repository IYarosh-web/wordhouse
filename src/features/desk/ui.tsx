import { Word } from "entities/word"
import { useEffect, useState } from "react";
import {motion} from "motion/react";

import styles from './styles.module.css';
import { getRandomPosition } from "./lib";
import { useUnit } from "effector-react";
import { wordClicked } from "./model";

type DeskProps = {
  words: Word[];
}

export function Desk({words}: DeskProps) {
  const [openWordModal] = useUnit([wordClicked])

  const [wordsPositions, setWordsPositions] = useState(() => {
    const map = new Map();
    
    words.forEach(w => {
      map.set(w.id, getRandomPosition());
    });

    return map;
  });

  useEffect(() => {
    setWordsPositions(() => {
      const map = new Map();
      words.map(w => map.set(w.id, getRandomPosition()))
      return map;
    })
  }, [words])

  return (
    <div className={styles.wrapper}>
      {words.map((w, i) => (
        <motion.button
          className={styles.word}
          layoutId={w.id}
          layout={true}
          layoutCrossfade
          initial={{
            boxShadow: "4px 4px 0px 2px #303952"
          }}
          style={{left: wordsPositions.get(w.id)?.x, top: wordsPositions.get(w.id)?.y}}
          onClick={() => openWordModal(w)}
        >
          {w.word}
        </motion.button>
      ))}
    </div>
  )
}