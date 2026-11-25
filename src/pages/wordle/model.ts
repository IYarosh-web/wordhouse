import { createGate } from "effector-react";
import { combine, createEffect, createEvent, createStore, sample } from "effector";

import { EMPTY_WORD, Word } from "entities/word";
import { WordApi } from "entities/word/api/types";

import { randomFrom, uuid } from "shared/lib";

import { checkGuess, checkWordExists, filterWord } from "./lib";
import { GameStatus, Guess, Status } from "./types";
import { MAX_GUESSES, WORD_EXIST_CHECK } from "./const";

type Deps = {
  wordsApi: WordApi;
}

export const createWordleFactory = (deps: Deps) => {
  const gameStarted = createEvent();
  const newInputCharAdded = createEvent<string>();
  const inputLastCharRemoved = createEvent();
  const guessSubmitted = createEvent();
  const guessAnimationEnded = createEvent();
  const hintRequested = createEvent();

  const $answer = createStore<Word>(EMPTY_WORD);
  const $guessCount = createStore<number>(MAX_GUESSES);
  const $guesses = createStore<Guess[]>([]);
  const $userInput = createStore<string>("");
  const $gameStatus = createStore<GameStatus>("running");
  const $letterStatuses = createStore<Record<string, Status>>({});
  const $error = createStore<string>("");
  const $hintsCount = createStore<number>(0);
  const $visibleInput = combine($hintsCount, $answer, $userInput, (hintsCount, answer, userInput) => (answer.word.slice(0, hintsCount) + userInput).slice(0, answer.word.length));
  
  const guessSubmittedFx = createEffect(
    async (guess: string) => {
      const exists = WORD_EXIST_CHECK ? await checkWordExists(guess) : true;
      if (!exists) {
        throw new Error("Word not found");
      }
  
      return guess.toUpperCase();
    },
  );
  
  const gameStartedFx = createEffect(
    async () => {
      const words = await deps.wordsApi.getWords();

      const validWords = words.filter(filterWord);

      return randomFrom(validWords);
    },
  );

  const errorTimeoutFx = createEffect(async () => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    return "";
  });
  
  const Gate = createGate();
  
  // START: Handle game start
  sample({
    clock: Gate.open,
    target: gameStarted,
  });
  
  sample({
    clock: gameStarted,
    fn: () => [],
    target: $guesses,
  });
  
  sample({
    clock: gameStarted,
    target: gameStartedFx,
  });

  sample({
    clock: gameStartedFx.doneData,
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
    clock: newInputCharAdded,
    source: {
      answer: $answer,
      userInput: $userInput,
      hintsCount: $hintsCount,
    },
    filter: ({userInput, answer, hintsCount}, char) => {
      if (char.length !== 1 || !char.match(/[A-Z]/i)) {
        return false;
      }

      if (hintsCount + userInput.length >= answer.word.length) {
        return false;
      }

      return true;
    },
    fn: ({ userInput }, newChar) => {
      return userInput + newChar;
    },
    target: $userInput,
  });

  sample({
    clock: inputLastCharRemoved,
    source: $userInput,
    fn: input => input.slice(0, -1),
    target: $userInput,
  });

  sample({
    clock: hintRequested,
    source: $hintsCount,
    fn: (hintsCount) => hintsCount + 1,
    target: $hintsCount,
  });
  
  sample({
    clock: hintRequested,
    source: $userInput,
    fn: (userInput) => userInput.slice(0, -1),
    target: $userInput,
  });
  
  // END: Handle user input
  
  // START: Handle guess submission
  sample({
    clock: guessSubmitted,
    source: {
      userInput: $userInput,
      hintsCount: $hintsCount,
      status: $gameStatus,
      answer: $answer,
    },
    filter: ({ status, answer, hintsCount, userInput }) => {
      const guess = (answer.word.slice(0, hintsCount) + userInput).slice(0, answer.word.length);
      debugger;
      return (
        status === "running" &&
        typeof guess === "string" &&
        answer.word.length > 0 &&
        guess.length === answer.word.length
      );
    },
    fn: ({ answer, hintsCount, userInput }) => {
      const guess = (answer.word.slice(0, hintsCount) + userInput).slice(0, answer.word.length);

      return guess;
    },
    target: guessSubmittedFx,
  });
  
  sample({
    clock: guessSubmittedFx.doneData,
    source: {
      guesses: $guesses,
      answer: $answer,
    },
    filter: ({ answer }, guess) => guess.length === answer.word.length,
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
    filter: (answer, guess) => guess.length === answer.word.length,
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
  
        const check = checkGuess(guess.value.toUpperCase(), answer.word.toUpperCase());
  
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
      if (guesses.some((guess) => guess.value.toUpperCase() === answer.word.toUpperCase())) {
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

  return {
    gameStarted,
    newInputCharAdded,
    inputLastCharRemoved,
    guessSubmitted,
    guessAnimationEnded,
    hintRequested,

    $answer,
    $guessCount,
    $guesses,
    $userInput,
    $gameStatus,
    $letterStatuses,
    $error,
    $hintsCount,
    $visibleInput,

    Gate,
  }
}
