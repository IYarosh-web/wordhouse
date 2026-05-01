import { useUnit } from "effector-react";
import { letterClicked, keyPressed, $letterStatuses } from "../model";
import { useEffect } from "react";

import styles from './guess.module.css';

const pattern = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

export function Keyboard() {
  const [handleLetterClick, handleLetterPress, letterStatuses] = useUnit([letterClicked, keyPressed, $letterStatuses]);

  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
        handleLetterPress(e);
      }

    document.addEventListener('keydown', keyboardHandler);
    return () => document.removeEventListener('keydown', keyboardHandler);
  });

  return (
    <div className="flex flex-col gap-1 items-center">
      {pattern.map((row, index) => (
        <div key={index} className="flex gap-1">
          {row.map((letter) => (
            <button key={letter} data-letter={letter} className={`w-6 h-6 border-1 ${styles[letterStatuses[letter]]}`} onClick={handleLetterClick}>{letter}</button>
          ))}
        </div>
      ))}
    </div>
  )
}