import { createEffect, createEvent, createStore, sample } from "effector";
import { Word } from "./types";
import { wordsApi } from "../api";

const loadWordsFx = createEffect(async () => {
  const words = await wordsApi.getWords();
  return words;
});

const deleteWordFx = createEffect(async (id: string) => {
  await wordsApi.deleteWord(id);
  return id;
});

const addWordFx = createEffect(async (word: Word) => {
  await wordsApi.createWord(word);
  return word;
});

const updateWordFx = createEffect(async (word: Word) => {
  await wordsApi.updateWord(word);
  return word;
});

export const $isLoading = loadWordsFx.pending;
export const $wordStore = createStore<Word[]>([]);
export const $uniqueWordsStore = $wordStore.map((words) =>
  words.filter(
    (word, index, self) =>
      self.findIndex((t) => t.word === word.word) === index,
  ),
);

export const loadWords = createEvent();
export const addWord = createEvent<Word>();
export const updateWord = createEvent<Word>();
export const deleteWord = createEvent<Word["id"]>();
export const wordAdded = createEvent<Word>();
export const wordUpdated = createEvent<Word>();
export const wordDeleted = createEvent<Word["id"]>();

sample({
  clock: loadWordsFx.doneData,
  target: $wordStore,
});

sample({
  clock: addWord,
  target: addWordFx,
});

sample({
  clock: updateWord,
  target: updateWordFx,
});

sample({
  clock: deleteWord,
  target: deleteWordFx,
});

sample({
  clock: deleteWordFx.doneData,
  source: $wordStore,
  fn: (words, id) => words.filter((word) => word.id !== id),
  target: $wordStore,
});

sample({
  clock: addWordFx.doneData,
  source: $wordStore,
  fn: (words, word) => [...words, word],
  target: $wordStore,
});

sample({
  clock: updateWordFx.doneData,
  source: $wordStore,
  fn: (words, word) => words.map((w) => (w.id === word.id ? word : w)),
  target: $wordStore,
});

sample({
  clock: loadWords,
  target: loadWordsFx,
});

sample({
  clock: addWordFx.doneData,
  target: wordAdded,
});

sample({
  clock: updateWordFx.doneData,
  target: wordUpdated,
});

sample({
  clock: deleteWordFx.doneData,
  target: wordDeleted,
});
