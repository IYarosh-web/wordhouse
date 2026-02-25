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
  const [hoveredWord, setHoveredWord] = useState<string>();

  useEffect(() => {
    setWordsPositions((curr) => {
      const map = new Map(curr);
      words.map(w => !map.has(w.id) && map.set(w.id, getRandomPosition()))
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
          initial={false}
          style={{
            left: wordsPositions.get(w.id)?.x,
            top: wordsPositions.get(w.id)?.y,
            zIndex: w.id === hoveredWord ? 2 : 'auto'
          }}
          onClick={() => openWordModal(w)}
          onHoverStart={() => setHoveredWord(w.id)}
        >
          {w.word}
        </motion.button>
      ))}
    </div>
  )
}