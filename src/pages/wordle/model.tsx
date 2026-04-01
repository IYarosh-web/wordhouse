import { createEffect, createEvent, createStore, sample } from "effector";
import { GameStatus, Guess } from "./types";
import { $wordStore } from "entities/word";
import { randomFrom, uuid } from "shared/lib";
import React, { ChangeEvent } from "react";
import { createGate } from "effector-react";

export const gameStarted = createEvent();
export const inputChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const letterClicked = createEvent<React.MouseEvent<HTMLButtonElement, MouseEvent>>()

export const $answer = createStore<string>('');
export const $guessCount = createStore<number>(5);
export const $guesses = createStore<Guess[]>([]);
export const $userInput = createStore<string>('');
export const $gameStatus = createStore<GameStatus>("running");

export const guessSubmittedFx = createEffect(
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const guess = formData.get("guess") || "";

    if (typeof guess !== 'string') {
      return "";
    }

    return guess;
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
  clock: inputChanged,
  source: $answer,
  fn: (answer, event) => {
    const value = event.target.value.toUpperCase();

    return value.slice(0, answer.length);
  },
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
