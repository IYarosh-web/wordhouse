import { useUnit } from "effector-react";
import { range } from "shared/lib";

import { Guess as GuessType } from "../types";
import { $guessCount } from "../model";
import { Guess } from "./guess";

type Props = {
  answer: string;
  guesses: GuessType[];
};

export function Results({ answer, guesses }: Props) {
  const [count] = useUnit([$guessCount]);

  return (
    <div className="flex flex-col gap-2 items-center">
      {range(count).map((i) => (
        <div key={i}>
          <Guess value={guesses[i]?.value} answer={answer} />
        </div>
      ))}
    </div>
  );
}
