import { useUnit } from "effector-react";
import { $answer } from "../model";
import { checkLetters } from "../model/helpers";
import { range } from "shared/lib";

type Props = {
  guess: string;
};

function UserGuess({ guess }: Props) {
  const [answer] = useUnit([$answer]);
  const letters = checkLetters(guess, answer);

  return (
    <span className="flex gap-2 h-10">
      {range(answer.length).map((_, index) => (
        <span
          key={index}
          className={`h-10 w-10 border border-gray-300 flex items-center justify-center text-gray-500 ${letters[index]?.status}`}
        >
          {guess[index]}
        </span>
      ))}
    </span>
  );
}

export default UserGuess;
