import { combine, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { $wordStore } from "entities/word";
import { ChangeEvent } from "react";

import { strIncludes } from "shared/lib";

export const filterChanged = createEvent<ChangeEvent<HTMLInputElement>>();

export const $filter = createStore<string>('');
export const $wordList = combine($wordStore, $filter, (words, filter) => words.filter(word => strIncludes(word.word, filter)));

export const wordListGate = createGate();

sample({
    clock: filterChanged,
    fn: (event) => event.target.value,
    target: $filter,
});
