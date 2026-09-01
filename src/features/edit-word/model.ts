import { combine, createEffect, sample } from "effector";
import { createGate } from "effector-react";

import { wordEntity, Word } from "entities/word";
import { Sentence, Definition, Translation } from "entities/word";

import { deepClone } from "shared/lib";
import { closeModal } from "shared/contracts";
import { $modal, $wordParam, MODALS } from "shared/routing";

export const $paramsWord = combine($modal, $wordParam, (modal, word) =>
  modal === MODALS.editWord ? word : "",
);
export const $activeWord = combine(
  $paramsWord,
  wordEntity.$wordStore,
  (paramsWord, words) => words.find((word) => word.word === paramsWord) || null,
);

export const ViewWordGate = createGate();

export const deleteDefinitionFormSubmittedFx = createEffect(
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const definitionId = formData.get("definitionId") as string;
    const wordId = formData.get("wordId") as string;

    return { definitionId, wordId };
  },
);

export const deleteSentenceFormSubmittedFx = createEffect(
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const sentenceId = formData.get("sentenceId") as string;
    const wordId = formData.get("wordId") as string;
    return { sentenceId, wordId };
  },
);

export const addDefinitionFormSubmittedFx = createEffect(
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const definition: Definition = {
      id: crypto.randomUUID(),
      definition: formData.get("definition") as string,
      wordId: formData.get("wordId") as string,
    };

    event.currentTarget.definition.value = "";

    return definition;
  },
);

export const addSentenceFormSubmittedFx = createEffect(
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const sentence: Sentence = {
      id: crypto.randomUUID(),
      sentence: formData.get("sentence") as string,
      wordId: formData.get("wordId") as string,
    };

    event.currentTarget.sentence.value = "";

    return sentence;
  },
);

export const addTranslationFormSubmittedFx = createEffect(
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const translation: Translation = {
      id: crypto.randomUUID(),
      translation: formData.get("translation") as string,
      wordId: formData.get("wordId") as string,
    };

    event.currentTarget.translation.value = "";

    return translation;
  },
);

export const deleteTranslationFormSubmittedFx = createEffect(
  (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const translationId = formData.get("translationId") as string;
    const wordId = formData.get("wordId") as string;

    return { translationId, wordId };
  },
);

sample({
  clock: addSentenceFormSubmittedFx.doneData,
  source: wordEntity.$wordStore,
  filter: (words, sentence) =>
    words.some((word) => word.id === sentence.wordId),
  fn: (words, sentence) => {
    const word = deepClone(
      words.find((word) => word.id === sentence.wordId),
    ) as Word;
    word.sentences?.push(sentence);
    return word;
  },
  target: wordEntity.updateWord,
});

sample({
  clock: addDefinitionFormSubmittedFx.doneData,
  source: wordEntity.$wordStore,
  filter: (words, definition) =>
    words.some((word) => word.id === definition.wordId),
  fn: (words, definition) => {
    const word = deepClone(
      words.find((word) => word.id === definition.wordId),
    ) as Word;
    word.definitions.push(definition);
    return word;
  },
  target: wordEntity.updateWord,
});

sample({
  clock: addTranslationFormSubmittedFx.doneData,
  source: wordEntity.$wordStore,
  filter: (words, translation) =>
    words.some((word) => word.id === translation.wordId),
  fn: (words, translation) => {
    const word = deepClone(
      words.find((word) => word.id === translation.wordId),
    ) as Word;
    word.translations.push(translation);
    return word;
  },
  target: wordEntity.updateWord,
});

sample({
  clock: deleteTranslationFormSubmittedFx.doneData,
  source: wordEntity.$wordStore,
  filter: (words, data) => words.some((word) => word.id === data.wordId),
  fn: (words, data) => {
    const word = deepClone(
      words.find((word) => word.id === data.wordId),
    ) as Word;
    word.translations = word.translations.filter(
      (translation) => translation.id !== data.translationId,
    );
    return word;
  },
  target: wordEntity.updateWord,
});

sample({
  clock: deleteDefinitionFormSubmittedFx.doneData,
  source: wordEntity.$wordStore,
  filter: (words, definition) =>
    words.some((word) => word.id === definition.wordId),
  fn: (words, data) => {
    const word = deepClone(
      words.find((word) => word.id === data.wordId),
    ) as Word;
    word.definitions = word.definitions.filter(
      (definition) => definition.id !== data.definitionId,
    );
    return word;
  },
  target: wordEntity.updateWord,
});

sample({
  clock: deleteSentenceFormSubmittedFx.doneData,
  source: wordEntity.$wordStore,
  filter: (words, sentence) =>
    words.some((word) => word.id === sentence.wordId),
  fn: (words, data) => {
    const word = deepClone(
      words.find((word) => word.id === data.wordId),
    ) as Word;
    word.sentences = word.sentences?.filter(
      (sentence) => sentence.id !== data.sentenceId,
    );
    return word;
  },
  target: wordEntity.updateWord,
});

sample({
  clock: wordEntity.wordDeleted,
  filter: ViewWordGate.status,
  target: closeModal,
});
