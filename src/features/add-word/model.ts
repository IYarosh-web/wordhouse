import { createEffect, createEvent, sample } from "effector";
import { createGate } from "effector-react";
import { Word } from "entities/word";
import { wordEntity } from "entities/word";
import { openModal } from "shared/contracts";
import { MODALS } from "shared/routing";

export const addWordClicked = createEvent<React.MouseEvent>();
export const addWordFormSubmitted =
  createEvent<React.FormEvent<HTMLFormElement>>();

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
      sentences: [
        {
          id: crypto.randomUUID(),
          sentence: formData.get("sentence") as string,
          wordId: id,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return word;
  },
);

sample({
  clock: addWordFormSubmittedFx.doneData,
  source: wordEntity.$wordStore,
  fn: (words, word) => {
    const sameWord = words.find((w) => w.word === word.word);
    if (sameWord) {
      sameWord.translations.push(word.translations[0]);
      return sameWord;
    }
    return word;
  },
  filter: (words, word) => words.some((w) => w.word === word.word),
  target: wordEntity.updateWord,
});

sample({
  clock: addWordFormSubmittedFx.doneData,
  source: wordEntity.$wordStore,
  fn: (words, word) => {
    const sameWord = words.find((w) => w.word === word.word);
    if (sameWord) {
      sameWord.translations.push(word.translations[0]);
      return sameWord;
    }
    return word;
  },
  filter: (words, word) => !words.some((w) => w.word === word.word),
  target: wordEntity.addWord,
});

sample({
  clock: addWordClicked,
  fn: () => ({ name: MODALS.addWord }),
  target: openModal,
});

sample({
  clock: [wordEntity.wordAdded, wordEntity.wordUpdated],
  filter: AddWordGate.status,
  fn: (word) => ({
    name: MODALS.editWord,
    params: { word: word.word },
  }),
  target: openModal,
});
