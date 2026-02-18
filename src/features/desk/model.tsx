import { createEffect, createEvent, sample } from "effector";
import { Word } from "entities/word";
import { history } from "app/router/history";

export const wordClicked = createEvent<Word>();
export const closeWord = createEvent();

export const navigateToWordFx = createEffect((word: Word) => {
  history.push(`/dashboard/${word.word}`);
});

export const closeWordFx = createEffect(() => {
  history.push(`/dashboard`);
});

sample({
  clock: wordClicked,
  target: navigateToWordFx,
});

sample({
  clock: closeWord,
  target: closeWordFx,
});
