import { createEffect, createEvent, sample } from "effector";
import { createGate } from "effector-react";
import { Word } from "entities/word";
import { $wordStore, addWordFx, updateWordFx } from "entities/word/model/store";
import { history } from "app/router/history";

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

export const redirectToDashboard = createEffect(async (word: Word) => {
  history.push(`/dashboard`);
});

sample({
  clock: addWordFormSubmittedFx.doneData,
  source: $wordStore,
  fn: (words, word) => {
    const sameWord = words.find((w) => w.word === word.word);
    if (sameWord) {
      sameWord.definitions.push(word.definitions[0]);
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
      sameWord.definitions.push(word.definitions[0]);
      return sameWord;
    }
    return word;
  },
  filter: (words, word) => !words.some((w) => w.word === word.word),
  target: addWordFx,
});

sample({
  clock: addWordFx.doneData,
  source: AddWordGate.state,
  filter: (gateOpen: boolean) => gateOpen,
  fn: (gateOpen: boolean, word: Word) => word,
  target: redirectToDashboard,
});

sample({
  clock: updateWordFx.doneData,
  source: AddWordGate.state,
  filter: (gateOpen: boolean) => gateOpen,
  fn: (gateOpen: boolean, word: Word) => word,
  target: redirectToDashboard,
});
