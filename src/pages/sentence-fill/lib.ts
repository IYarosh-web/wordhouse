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

  return {
    word: word.word,
    sentence: sentence.sentence,
  };
};

export const hideAnswerInSentence = (sentence: string, word: string, hintsCount: number = 0, showAnswer: boolean = false) => {
  const wordStartIndex = sentence.toUpperCase().indexOf(word.toUpperCase());
  const wordEndIndex = wordStartIndex + sentence.slice(wordStartIndex).search(/(\s|\,|\.|$)/);
  const answer = sentence.slice(wordStartIndex, wordEndIndex).split('').map((l, i) => (showAnswer ||  i < hintsCount) ? l : '_').join('');

  return sentence.slice(0, wordStartIndex) + answer + sentence.slice(wordEndIndex);
}