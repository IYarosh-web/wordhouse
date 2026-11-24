import { useUnit } from "effector-react";
import { useEffect } from "react";

import { wordleModel } from "../";

import styles from "./guess.module.css";

const pattern = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export function Keyboard() {
  const [letterStatuses, addNewChar, removeLastChar] = useUnit([
    wordleModel.$letterStatuses,
    wordleModel.newInputCharAdded,
    wordleModel.inputLastCharRemoved,
  ]);

  const handleLetterClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    const letter = e.currentTarget.dataset.letter;
    if (typeof letter !== 'string') {
      return;
    }

    addNewChar(letter);
  }

  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      if (e.code.startsWith('Key')) {
        addNewChar(e.code.slice(3));
      }

      if (e.code === 'Backspace') {
        removeLastChar();
      }
    };

    document.addEventListener("keydown", keyboardHandler);
    return () => document.removeEventListener("keydown", keyboardHandler);
  });

  return (
    <div className="flex flex-col gap-1 items-center">
      {pattern.map((row, index) => (
        <div key={index} className="flex gap-1">
          {row.map((letter) => (
            <button
              key={letter}
              data-letter={letter}
              className={`w-6 h-6 border ${styles[letterStatuses[letter]]}`}
              onClick={handleLetterClick}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
