import { combine, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { $wordStore } from "entities/word";
import { ChangeEvent } from "react";

import { strIncludes } from "shared/lib";
import { SortOption } from "./lib";

export const filterChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const sortChanged = createEvent<SortOption>();

export const $filter = createStore<string>("");
export const $sort = createStore<SortOption>("alphabetical");
export const $wordList = combine(
  $wordStore,
  $filter,
  $sort,
  (words, filter, sort) =>
    words
      .filter((word) => strIncludes(word.word, filter))
      .sort((a, b) => {
        if (sort === "alphabetical") {
          return a.word.localeCompare(b.word);
        }
        if (sort === "createdAt") {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
        if (sort === "updatedAt") {
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        }
        return 0;
      }),
);

export const wordListGate = createGate();

sample({
  clock: filterChanged,
  fn: (event) => event.target.value,
  target: $filter,
});

sample({
  clock: sortChanged,
  target: $sort,
});
