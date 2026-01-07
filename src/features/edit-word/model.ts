import { createEffect, createEvent, sample } from "effector";
import { $wordStore } from "entities/word";
import { updateWord } from "entities/word/model/store";
import { Sentence, Definition } from "entities/word";
import { deepClone } from "shared/lib";

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

    return sentence;
  },
);

sample({
  clock: addSentenceFormSubmittedFx.doneData,
  source: $wordStore,
  filter: (words, sentence) =>
    words.some((word) => word.id === sentence.wordId),
  fn: (words, sentence) => {
    const word = deepClone(words.find((word) => word.id === sentence.wordId));
    word.sentences.push(sentence);
    return word;
  },
  target: updateWord,
});

sample({
  clock: addDefinitionFormSubmittedFx.doneData,
  source: $wordStore,
  filter: (words, definition) =>
    words.some((word) => word.id === definition.wordId),
  fn: (words, definition) => {
    const word = deepClone(words.find((word) => word.id === definition.wordId));
    word.definitions.push(definition);
    return word;
  },
  target: updateWord,
});

sample({
  clock: deleteDefinitionFormSubmittedFx.doneData,
  source: $wordStore,
  filter: (words, definition) =>
    words.some((word) => word.id === definition.wordId),
  fn: (words, data) => {
    const word = deepClone(words.find((word) => word.id === data.wordId));
    word.definitions = word.definitions.filter(
      (definition) => definition.id !== data.definitionId,
    );
    return word;
  },
  target: updateWord,
});

sample({
  clock: deleteSentenceFormSubmittedFx.doneData,
  source: $wordStore,
  filter: (words, sentence) =>
    words.some((word) => word.id === sentence.wordId),
  fn: (words, data) => {
    const word = deepClone(words.find((word) => word.id === data.wordId));
    word.sentences = word.sentences.filter(
      (sentence) => sentence.id !== data.sentenceId,
    );
    return word;
  },
  target: updateWord,
});
