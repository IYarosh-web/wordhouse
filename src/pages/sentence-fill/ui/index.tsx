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
      <form onSubmit={submitGuess}>
        <Input
          name="guess"
          placeholder="Enter your guess"
          value={input}
          onChange={changeInput}
        />
        <Button type="submit">Submit</Button>
      </form>
      <Button onClick={() => restart()}>Restart</Button>
    </div>
  );
}
