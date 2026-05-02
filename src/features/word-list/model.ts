import { sample } from "effector";
import { createGate } from "effector-react";
import { $wordStore } from "entities/word";

export const $wordList = $wordStore;

export const wordListGate = createGate();

sample({
    clock: wordListGate.open,
    source: $wordStore,
    target: $wordList,
});