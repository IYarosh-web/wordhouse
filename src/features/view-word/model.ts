import { locationChanged } from "app/model";
import { combine, createEffect, createEvent, createStore, sample } from "effector";
import { $wordStore, Word, wordClicked } from "entities/word";
import { history } from "app/router/history";

export const $paramsWord = createStore<Word["word"]>(null);
export const $activeWord = combine(
  $paramsWord,
  $wordStore,
  (paramsWord, words) => words.find((word) => word.word === paramsWord) || null,
);

const openWordFx = createEffect((word: Word) => {
  history.push('/dashboard/' + word.word);
});

sample({
  clock: locationChanged,
  filter: (location) => {
    const pathParts = location.split("/");
    return !!(pathParts[1] === "dashboard" && pathParts[2]);
  },
  fn: (location) => location.split("/")[2],
  target: $paramsWord,
});

sample({
  clock: wordClicked,
  target: openWordFx,
});
