import { useGate, useUnit } from "effector-react";

import {
  gameGate,
  $sentenceToFill,
  $answer,
  gameRestarted,
  $gameStatus,
  $hintsCount,
  $input,
  inputChanged,
  guessSubmitted,
  $message,
} from "../model";
import { Button, Input } from "shared/ui";

export function SentenceFillWidget() {
  const [sentenceToFill, input, restart, changeInput, submitGuess, message] =
    useUnit([
      $sentenceToFill,
      $input,
      gameRestarted,
      inputChanged,
      guessSubmitted,
      $message,
    ]);

  useGate(gameGate);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span>Complete the sentence:</span>
      <span>{sentenceToFill}</span>
      <span>{message}</span>
      <form className="flex gap-2" onSubmit={submitGuess}>
        <Input
          name="guess"
          placeholder="Enter your guess"
          value={input}
          onChange={changeInput}
        />
        <Button className="px-2 py-1" type="submit">Submit</Button>
        <Button className="px-2 py-1" type="button">Hint</Button>
      </form>
      <Button className="px-2 py-1" onClick={() => restart()}>Restart</Button>
    </div>
  );
}
