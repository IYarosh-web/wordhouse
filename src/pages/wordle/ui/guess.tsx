import { range } from "shared/lib";

import { useUnit } from "effector-react";

import { guessAnimationEnded } from "../model";
import { checkGuess } from "../lib";

import styles from "./guess.module.css";

type Props = {
  answer: string;
  value?: string;
};

export function Guess({ value = "", answer }: Props) {
  const [handleAnimationEnded] = useUnit([guessAnimationEnded]);

  const result = checkGuess(value, answer);

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLDivElement &&
      e.target.dataset.islast === "true"
    ) {
      handleAnimationEnded();
    }
  };

  return (
    <div className="flex gap-2">
      {range(answer.length).map((_, i) => (
        <div key={i} className={`w-6 h-6 border-1 relative ${styles.wrap}`}>
          {result[i]?.char && (
            <div
              className={`absolute inset-0 flex items-center justify-center ${styles[result[i]?.status]} ${styles.letter}`}
              onAnimationEnd={handleAnimationEnd}
              data-islast={i === answer.length - 1}
            >
              <div className={`absolute inset-0 ${styles.back}`} />
              <span className={`${styles.char}`}>{result[i]?.char}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
