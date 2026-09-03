import { createEffect, createEvent, sample } from "effector";
import { createGate } from "effector-react";
import { Word, WordEntity } from "entities/word";
import { openModal } from "shared/contracts";
import { MODALS } from "shared/routing";

type Deps = {
  wordEntity: WordEntity;
};

export const createAddWordFactory = (deps: Deps) => {
  const { wordEntity } = deps;

  const clicked = createEvent<React.MouseEvent>();
  const formSubmitted = createEvent<React.FormEvent<HTMLFormElement>>();

  const Gate = createGate();

  const formSubmittedFx = createEffect(
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
    clock: formSubmitted,
    target: formSubmittedFx,
  });

  sample({
    clock: formSubmittedFx.doneData,
    source: wordEntity.$wordStore,
    fn: (words, word) => {
      const sameWord = words.find((w) => w.word === word.word);
      if (sameWord) {
        return {
          ...sameWord,
          translations: [...sameWord.translations, word.translations[0]],
        };
      }
      return word;
    },
    filter: (words, word) => words.some((w) => w.word === word.word),
    target: wordEntity.updateWord,
  });

  sample({
    clock: formSubmittedFx.doneData,
    source: wordEntity.$wordStore,
    fn: (words, word) => {
      const sameWord = words.find((w) => w.word === word.word);
      if (sameWord) {
        return {
          ...sameWord,
          translations: [...sameWord.translations, word.translations[0]],
        };
      }
      return word;
    },
    filter: (words, word) => !words.some((w) => w.word === word.word),
    target: wordEntity.addWord,
  });

  sample({
    clock: clicked,
    fn: () => ({ name: MODALS.addWord }),
    target: openModal,
  });

  sample({
    clock: [wordEntity.wordAdded, wordEntity.wordUpdated],
    filter: Gate.status,
    fn: (word) => ({
      name: MODALS.editWord,
      params: { word: word.word },
    }),
    target: openModal,
  });

  return {
    clicked,
    formSubmitted,
    Gate,
  };
};
