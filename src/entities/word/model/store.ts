import { createEffect, createEvent, createStore, sample } from "effector";
import { Word } from "./types";
import { WordApi } from "../api/types";

type WordEntityDeps = {
  wordsApi: WordApi;
};

export const createWordEntity = ({ wordsApi }: WordEntityDeps) => {
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

  const $isLoading = loadWordsFx.pending;
  const $wordStore = createStore<Word[]>([]);

  const loadWords = createEvent();
  const addWord = createEvent<Word>();
  const updateWord = createEvent<Word>();
  const deleteWord = createEvent<Word["id"]>();

  const wordsLoaded = createEvent<Word[]>();
  const wordAdded = createEvent<Word>();
  const wordUpdated = createEvent<Word>();
  const wordDeleted = createEvent<Word["id"]>();

  sample({
    clock: loadWordsFx.doneData,
    target: [$wordStore, wordsLoaded],
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

  return {
    $isLoading,
    $wordStore,
    loadWords,
    addWord,
    updateWord,
    deleteWord,
    wordAdded,
    wordUpdated,
    wordDeleted,
    wordsLoaded,
  };
};
