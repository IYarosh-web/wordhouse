import { useGate, useUnit } from "effector-react";
import { useRef } from "react";
import { useEffect } from "react";

import { Button, FocusOnCtrlKey, Icons, KeyboardShortcut } from "shared/ui";

import {
  $answer,
  $error,
  $gameStatus,
  $guesses,
  $hintsCount,
  $userInput,
  $visibleInput,
  gameStarted,
  guessSubmitted,
  hintRequested,
  wordleGate,
} from "../model";
import { Results } from "./results";
import { Keyboard } from "./keyboard";
import { WordLinkComponent } from "features/word-link";

export function WidgetWordle() {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [answer, visibleInput, input, guesses, handleSubmit, error, gameStatus, reset, requestHint, hintsCount] =
    useUnit([
      $answer,
      $visibleInput,
      $userInput,
      $guesses,
      guessSubmitted,
      $error,
      $gameStatus,
      gameStarted,
      hintRequested,
      $hintsCount,
    ]);
    console.log({input, visibleInput});
  useGate(wordleGate);

  useEffect(() => {
    const handleSubmit = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        submitButtonRef.current?.click();
      }
    };
    document.addEventListener("keydown", handleSubmit);
    return () => document.removeEventListener("keydown", handleSubmit);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 p-6 m-auto h-full">
        <h3 className="text-2xl text-center font-bold">
          Wordle{" "}
          <Button onClick={reset}>
            <Icons.ArrowsRotateLeft />
          </Button>
        </h3>
        <p className="min-h-6 text-center">
          {error && <span className="text-red-500">{error}</span>}
          {gameStatus === "won" && (
            <span className="text-green-500">You won! The word is <WordLinkComponent word={answer} />.</span>
          )}
          {gameStatus === "lost" && (
            <span className="text-red-500">
              Unfrotunately, you've lost! The word was{" "}
              <WordLinkComponent word={answer} />.
            </span>
          )}
        </p>
        <Results guesses={guesses} answer={answer} />
      </div>
      <div className="flex flex-col gap-2">
        <form
          action="#"
          className="min-h-20 flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <span className="text-center">Your guess:</span>
          <input type="text" name="guess" value={visibleInput} className="hidden" />
          <div className="flex gap-2 justify-center">
            {answer.split("").map((_, index) => (
              <span
                key={index}
                className={`p-1 w-6 h-6 border flex items-center justify-center ${hintsCount > index && "bg-amber-200"}`}
              >
                {visibleInput[index]}
              </span>
            ))}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <KeyboardShortcut keys={["ArrowRight"]} />
            <FocusOnCtrlKey keyCode="ArrowRight">
              <Button className="w-min px-2 py-1" type="submit" ref={submitButtonRef}>
                Submit
              </Button>
            </FocusOnCtrlKey>
            <Button className="w-min px-2 py-1" type="button" onClick={requestHint}>
              Hint
            </Button>
          </div>
        </form>
        <Keyboard />
      </div>
    </>
  );
}
