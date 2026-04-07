import { useUnit } from "effector-react";
import { $guessCount } from "../model";
import { range } from "shared/lib";
import { Guess } from "./guess";
import { Guess as GuessType } from "../types";

type Props = {
  answer: string;
  guesses: GuessType[];
}

export function Results({
  answer,
  guesses,
}: Props) {
  const [count] = useUnit([$guessCount]);

  return (
    <div className="flex flex-col gap-2">
      {range(count).map(i => (
        <div key={i}>
          <Guess value={guesses[i]?.value} answer={answer} />
        </div>
      ))}
    </div>
  )
}