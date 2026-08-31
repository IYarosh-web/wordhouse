import { Word } from "entities/word";
import { randomFrom, strIncludes } from "shared/lib";

export const getSentenceToFill = (words: Word[]) => {
  const wordsWithSentences = words.filter((word) => word.sentences.length > 0);
  const wordsWithValidSentences = wordsWithSentences.filter((word) =>
    word.sentences.some((sentence) =>
      strIncludes(sentence.sentence, word.word),
    ),
  );

  if (wordsWithValidSentences.length === 0) {
    throw new Error("You don't have a valid word for this exercise");
  }

  const word = randomFrom(wordsWithValidSentences);
  const sentence = randomFrom(
    word.sentences.filter((sentence) =>
      strIncludes(sentence.sentence, word.word),
    ),
  );

  const wordIndexStart = sentence.sentence
    .toLowerCase()
    .indexOf(word.word.toLowerCase());
  const wordIndexEnd = wordIndexStart + word.word.length;

  const sentenceWithGap =
    sentence.sentence.slice(0, wordIndexStart) +
    new Array(word.word.length).fill("_").join("") +
    sentence.sentence.slice(wordIndexEnd);
  return {
    word: word.word,
    sentence: sentenceWithGap,
  };
};
