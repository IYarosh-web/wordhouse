import { createStore, sample } from "effector";
import { createGate } from "effector-react";
import { $wordStore, Word } from "entities/word";

export const $wordList = createStore<Word[]>([]);

export const wordListGate = createGate();

sample({
    clock: wordListGate.open,
    source: $wordStore,
    target: $wordList,
});