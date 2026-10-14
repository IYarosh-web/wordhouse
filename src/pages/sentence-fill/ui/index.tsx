import { useGate, useUnit } from "effector-react";

import { WordLinkComponent } from "features/word-link";
import { Button, Input } from "shared/ui";

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
  hintRequested,
} from "../model";
import { SentenceToFill } from "./sentence-to-fill";

export function SentenceFillWidget() {
  const [sentenceToFill, input, restart, changeInput, submitGuess, message, answer, hintsCount, requestHint, status] =
    useUnit([
      $sentenceToFill,
      $input,
      gameRestarted,
      inputChanged,
      guessSubmitted,
      $message,
      $answer,
      $hintsCount,
      hintRequested,
      $gameStatus
    ]);

  useGate(gameGate);

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span>Complete the sentence:</span>
      <SentenceToFill sentence={sentenceToFill} answer={answer} hintsCount={hintsCount} showAnswer={status === 'won'} />
      {status !== 'running' && (
        <div className="flex gap-2">
          <span>{message}</span>
          <span>The answer was: <WordLinkComponent word={answer} autoFocus /></span>
        </div>
      )}
      <form className="flex gap-2" onSubmit={submitGuess}>
        <Input
          name="guess"
          placeholder="Enter your guess"
          value={input}
          onChange={changeInput}
        />
        <Button className="px-2 py-1" type="submit">
          Submit
        </Button>
        <Button className="px-2 py-1" type="button" onClick={requestHint}>
          Hint
        </Button>
      </form>
      <Button className="px-2 py-1" onClick={() => restart()}>
        Restart
      </Button>
    </div>
  );
}
