import { range } from "shared/lib";
import { checkGuess } from "../lib";

import styles from './guess.module.css';

type Props = {
  answer: string;
  value?: string;
}

export function Guess({value, answer}: Props) {
  const result = checkGuess(value, answer);

  return (
    <div className="flex gap-2">
      {range(answer.length).map((_, i) => (
        <div
          key={i}
          className={`p-2 w-10 h-10 border-2 flex items-center justify-center ${styles[result[i]?.status]}`}
        >
          {result[i]?.char}
        </div>
      ))}
    </div>
  )
}