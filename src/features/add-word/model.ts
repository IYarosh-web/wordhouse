import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { Word } from "entities/word";
import { $wordStore, addWordFx, updateWordFx } from "entities/word/model/store";

export const $isOpen = createStore(false);

export const addWordClicked = createEvent<React.MouseEvent>();
export const addWordFormSubmitted =
  createEvent<React.FormEvent<HTMLFormElement>>();
export const closeModal = createEvent();

export const AddWordGate = createGate();

export const addWordFormSubmittedFx = createEffect(
  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const id = crypto.randomUUID();

    const word: Word = {
      id,
      word: formData.get("word") as string,
      translations: [
        {
          id: crypto.randomUUID(),
          translation: formData.get("translation") as string,
          wordId: id,
        },
      ],
      definitions: [
        {
          id: crypto.randomUUID(),
          definition: formData.get("definition") as string,
          wordId: id,
        },
      ],
      sentences: [],
    };

    return word;
  },
);

sample({
  clock: addWordFormSubmittedFx.doneData,
  source: $wordStore,
  fn: (words, word) => {
    const sameWord = words.find((w) => w.word === word.word);
    if (sameWord) {
      sameWord.translations.push(word.translations[0]);
      return sameWord;
    }
    return word;
  },
  filter: (words, word) => words.some((w) => w.word === word.word),
  target: updateWordFx,
});

sample({
  clock: addWordFormSubmittedFx.doneData,
  source: $wordStore,
  fn: (words, word) => {
    const sameWord = words.find((w) => w.word === word.word);
    if (sameWord) {
      sameWord.translations.push(word.translations[0]);
      return sameWord;
    }
    return word;
  },
  filter: (words, word) => !words.some((w) => w.word === word.word),
  target: addWordFx,
});

sample({
  clock: addWordClicked,
  fn: () => true,
  target: $isOpen,
});

sample({
  clock: [closeModal, addWordFormSubmittedFx.doneData],
  fn: () => false,
  target: $isOpen,
});
