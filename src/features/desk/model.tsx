import { createEffect, createEvent, sample } from "effector";
import { Word } from "entities/word";
import { history } from "app/router/history";

export const addWordClicked = createEvent();
export const closeAddWordModal = createEvent();
export const wordClicked = createEvent<Word>();
export const closeWord = createEvent();

export const navigateToWordFx = createEffect((word: Word) => {
  history.push(`/dashboard/${word.word}`);
});

export const closeWordFx = createEffect(() => {
  history.push(`/dashboard`);
});

export const openAddWordModalFx = createEffect(() => {
  history.push(`/dashboard/add-word`);
});

export const closeAddWordModalFx = createEffect(() => {
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

sample({
  clock: addWordClicked,
  target: openAddWordModalFx,
});

sample({
  clock: closeAddWordModal,
  target: closeAddWordModalFx, 
});