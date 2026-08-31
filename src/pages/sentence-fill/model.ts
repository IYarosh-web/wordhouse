import { createEvent, createStore, sample } from "effector";
import { $wordStore } from "entities/word";
import { getSentenceToFill } from "./lib";
import { createGate } from "effector-react";
import { GameStatus } from "shared/lib/types";

export const $answer = createStore("");
export const $sentenceToFill = createStore("");
export const $showAnswer = createStore(false);
export const $hintsCount = createStore(0);
export const $gameStatus = createStore<GameStatus>("running");
export const $input = createStore<string>("");
export const $message = createStore<string>("");

export const gameRestarted = createEvent();
export const guessSubmitted = createEvent<React.FormEvent<HTMLFormElement>>();
export const hintRequested = createEvent();
export const inputChanged = createEvent<React.ChangeEvent<HTMLInputElement>>();

export const gameGate = createGate();

const gamePrepared = sample({
  clock: [gameGate.open, gameRestarted],
  source: $wordStore,
  fn: getSentenceToFill,
});

sample({
  clock: gamePrepared,
  fn: ({ sentence }) => sentence,
  target: $sentenceToFill,
});

sample({
  clock: gamePrepared,
  fn: ({ word }) => word,
  target: $answer,
});

sample({
  clock: hintRequested,
  source: $hintsCount,
  fn: (hintsCount) => hintsCount + 1,
  target: $hintsCount,
});

sample({
  clock: inputChanged,
  source: $answer,
  fn: (answer, event) => event.currentTarget.value.slice(0, answer.length),
  target: $input,
});

sample({
  clock: guessSubmitted,
  source: $answer,
  fn: (answer, event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const guess = formData.get("guess");
    if (typeof guess !== "string") {
      return "lost";
    }

    return guess.toLowerCase() === answer.toLowerCase() ? "won" : "lost";
  },
  target: $gameStatus,
});

sample({
  clock: $gameStatus,
  fn: (gameStatus) => (gameStatus === "won" ? "won" : gameStatus),
  target: $gameStatus,
});

sample({
  clock: guessSubmitted,
  source: $answer,
  fn: (answer, event) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const guess = formData.get("guess");

    if (String(guess).toLowerCase() === answer.toLowerCase()) {
      return "Congrats! You guessed the word correctly!";
    } else {
      return "Oops! That was not the correct word. Try again!";
    }
  },
  target: $message,
});
