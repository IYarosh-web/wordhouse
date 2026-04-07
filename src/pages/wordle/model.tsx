import { createEffect, createEvent, createStore, sample } from "effector";
import { GameStatus, Guess, LetterStatus, Status } from "./types";
import { $wordStore } from "entities/word";
import { randomFrom, uuid } from "shared/lib";
import React, { ChangeEvent } from "react";
import { createGate } from "effector-react";
import { checkGuess } from "./lib";

export const gameStarted = createEvent();
export const keyPressed = createEvent<KeyboardEvent>();
export const letterClicked = createEvent<React.MouseEvent<HTMLButtonElement, MouseEvent>>();

export const $answer = createStore<string>('');
export const $guessCount = createStore<number>(5);
export const $guesses = createStore<Guess[]>([]);
export const $userInput = createStore<string>('');
export const $gameStatus = createStore<GameStatus>("running");
export const $letterStatuses = createStore<Record<string, Status>>({});

export const guessSubmittedFx = createEffect(
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const guess = formData.get("guess") || "";
    
    console.log('guessSubmittedFx', guess);
    if (typeof guess !== 'string') {
      return "";
    }

    return guess.toUpperCase();
  },
);


export const wordleGate = createGate();

sample({
  clock: wordleGate.open,
  target: gameStarted,
})

sample({
  clock: gameStarted,
  fn: () => [],
  target: $guesses,
});

sample({
  clock: gameStarted,
  source: $wordStore,
  filter: (words) => words.length > 0,
  fn: (words, _) => (
    randomFrom(words).word.toUpperCase()
  ),
  target: $answer,
});

sample({
  clock: gameStarted,
  fn: () => '',
  target: $userInput,
});

sample({
  clock: keyPressed,
  source: {
    answer: $answer,
    userInput: $userInput,
  },
  filter: (_, event) => !!(event.key.length === 1 && event.key.match(/[A-Z]/i)),
  fn: ({answer, userInput}, event) => {
    const value = (userInput + event.key.toUpperCase()).slice(0, answer.length);
    return value;
  },
  target: $userInput,
});

sample({
  clock: keyPressed,
  filter: (_, event) => event.key === 'Backspace',
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
  fn: ({input, answer}, event) => {
    const letter = event.currentTarget.dataset.letter;
    return (input + letter).slice(0, answer.length);
  },
  target: $userInput,
});

sample({
  clock: guessSubmittedFx.doneData,
  source: {
    guesses: $guesses,
    answer: $answer,
  },
  filter: ({answer}, guess) => guess.length === answer.length,
  fn: (source, guess) => ([
    ...source.guesses,
    ({
      id: uuid(),
      value: guess,
    }),
  ]),
  target: $guesses,
});

sample({
  clock: guessSubmittedFx.doneData,
  source: $answer,
  filter: (answer, guess) => guess.length === answer.length,
  fn: () => '',
  target: $userInput,
})

sample({
  clock: guessSubmittedFx.doneData,
  source: $answer,
  filter: (answer, guess) => guess === answer,
  fn: (): GameStatus => 'won',
  target: $gameStatus,
});

sample({
  clock: $guesses,
  source: $answer,
  fn: (answer, guesses) => {
    const statuses: Record<string, Status> = {};
    guesses.forEach((guess) => {
      const statusPriotities = {
        correct: 0,
        misplaced: 1,
        missing: 2,
      };
      
      const check = checkGuess(guess.value, answer);

      check.forEach((letterStatus) => {
        if (statusPriotities[letterStatus.status] > statusPriotities[statuses[letterStatus.char]]) {
          statuses[letterStatus.char] = letterStatus.status;
        } else {
          statuses[letterStatus.char] = letterStatus.status;
        }
      });
    });
    return statuses;
  },
  target: $letterStatuses,
});