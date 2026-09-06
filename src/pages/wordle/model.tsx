import React from "react";
import { createGate } from "effector-react";
import { combine, createEffect, createEvent, createStore, sample } from "effector";

import { wordEntity } from "entities/word";
import { randomFrom, uuid } from "shared/lib";

import { checkGuess, checkWordExists, filterWord } from "./lib";
import { GameStatus, Guess, Status } from "./types";
import { MAX_GUESSES, WORD_EXIST_CHECK } from "./const";

export const gameStarted = createEvent();
export const keyPressed = createEvent<KeyboardEvent>();
export const letterClicked =
  createEvent<React.MouseEvent<HTMLButtonElement, MouseEvent>>();
export const guessSubmitted = createEvent<React.FormEvent<HTMLFormElement>>();
export const guessAnimationEnded = createEvent();
export const hintRequested = createEvent();

export const $answer = createStore<string>("");
export const $guessCount = createStore<number>(MAX_GUESSES);
export const $guesses = createStore<Guess[]>([]);
export const $userInput = createStore<string>("");
export const $gameStatus = createStore<GameStatus>("running");
export const $letterStatuses = createStore<Record<string, Status>>({});
export const $error = createStore<string>("");
export const $hintsCount = createStore<number>(0);
export const $visibleInput = combine($hintsCount, $answer, $userInput, (hintsCount, answer, userInput) => (answer.slice(0, hintsCount) + userInput).slice(0, answer.length));

const guessSubmittedFx = createEffect(
  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const guess = formData.get("guess") || "";

    if (typeof guess !== "string") {
      return "";
    }

    const exists = WORD_EXIST_CHECK ? await checkWordExists(guess) : true;
    if (!exists) {
      throw new Error("Word not found");
    }

    return guess.toUpperCase();
  },
);

const errorTimeoutFx = createEffect(async () => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return "";
});

export const wordleGate = createGate();

// START: Handle game start
sample({
  clock: wordleGate.open,
  target: gameStarted,
});

sample({
  clock: gameStarted,
  fn: () => [],
  target: $guesses,
});

sample({
  clock: gameStarted,
  source: wordEntity.$wordStore,
  filter: (words) => words.length > 0,
  fn: (words, _) => randomFrom(words.filter(filterWord)).word.toUpperCase(),
  target: $answer,
});

sample({
  clock: gameStarted,
  fn: () => "",
  target: $userInput,
});

sample({
  clock: gameStarted,
  fn: () => 0,
  target: $hintsCount,
});

sample({
  clock: gameStarted,
  fn: () => ({}),
  target: $letterStatuses,
});

sample({
  clock: gameStarted,
  fn: (): GameStatus => "running",
  target: $gameStatus,
});

// END: Handle game start

// START: Handle user input
sample({
  clock: keyPressed,
  source: {
    answer: $answer,
    userInput: $userInput,
  },
  filter: (_, event) => !!(event.key.length === 1 && event.key.match(/[A-Z]/i)),
  fn: ({ answer, userInput }, event) => {
    const value = (userInput + event.key.toUpperCase()).slice(0, answer.length);
    return value;
  },
  target: $userInput,
});

sample({
  clock: keyPressed,
  filter: (_, event) => event.key === "Backspace",
  source: $userInput,
  fn: (userInput) => userInput.slice(0, -1),
  target: $userInput,
});

sample({
  clock: letterClicked,
  source: {
    input: $userInput,
    answer: $answer,
  },
  fn: ({ input, answer }, event) => {
    const letter = event.currentTarget.dataset.letter;
    return (input + letter).slice(0, answer.length);
  },
  target: $userInput,
});

sample({
  clock: hintRequested,
  source: $hintsCount,
  fn: (hintsCount) => hintsCount + 1,
  target: $hintsCount,
});

// END: Handle user input

// START: Handle guess submission
sample({
  clock: guessSubmitted,
  source: {
    status: $gameStatus,
    answer: $answer,
  },
  filter: ({ status, answer }, event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const guess = formData.get("guess") || "";
    console.log({ guess });
    return (
      status === "running" &&
      typeof guess === "string" &&
      answer.length > 0 &&
      guess.length === answer.length
    );
  },
  fn: (_, event) => event,
  target: guessSubmittedFx,
});

sample({
  clock: guessSubmittedFx.doneData,
  source: {
    guesses: $guesses,
    answer: $answer,
  },
  filter: ({ answer }, guess) => guess.length === answer.length,
  fn: (source, guess) => [
    ...source.guesses,
    {
      id: uuid(),
      value: guess,
    },
  ],
  target: $guesses,
});

sample({
  clock: guessSubmittedFx.doneData,
  source: $answer,
  filter: (answer, guess) => guess.length === answer.length,
  fn: () => "",
  target: $userInput,
});

sample({
  clock: guessSubmittedFx.doneData,
  fn: () => "",
  target: $error,
});

// END: Handle guess submission

sample({
  clock: guessAnimationEnded,
  source: { guesses: $guesses, answer: $answer, statuses: $letterStatuses },
  fn: ({ answer, guesses, statuses }) => {
    const newStatuses: Record<string, Status> = { ...statuses };
    guesses.forEach((guess) => {
      const statusPriorities = {
        correct: 2,
        misplaced: 1,
        missing: 0,
      };

      const check = checkGuess(guess.value, answer);

      check.forEach((letterStatus) => {
        if (
          !newStatuses[letterStatus.char] ||
          statusPriorities[letterStatus.status] >
            statusPriorities[newStatuses[letterStatus.char]]
        ) {
          newStatuses[letterStatus.char] = letterStatus.status;
        }
      });
    });
    return newStatuses;
  },
  target: $letterStatuses,
});

sample({
  clock: guessAnimationEnded,
  source: { guesses: $guesses, answer: $answer },
  fn: ({ answer, guesses }) => {
    if (guesses.some((guess) => guess.value === answer)) {
      return "won";
    }
    if (guesses.length >= MAX_GUESSES) {
      return "lost";
    }
    return "running";
  },
  target: $gameStatus,
});

// START: Handle guess submission failure

sample({
  clock: guessSubmittedFx.failData,
  fn: () => "Sorry lad, that word doesn't exist",
  target: $error,
});

sample({
  clock: guessSubmittedFx.failData,
  target: errorTimeoutFx,
});

sample({
  clock: errorTimeoutFx.done,
  fn: () => "",
  target: $error,
});

// END: Handle guess submission failure
