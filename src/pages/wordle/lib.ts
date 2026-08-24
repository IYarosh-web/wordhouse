import { Word } from "entities/word";
import words from "an-array-of-english-words";

import { LetterStatus, Status } from "./types";
import { MAX_WORD_LENGTH, MIN_WORD_LENGTH } from "./const";

export function checkGuess(guess: string, answer: string): LetterStatus[] {
  // This constant is a placeholder that indicates we've successfully
  // dealt with this character (it's correct, or misplaced).
  const SOLVED_CHAR = '✓';

  if (!guess) {
    return [];
  }

  const guessChars = guess.toUpperCase().split('');
  const answerChars = answer.split('');

  const result: LetterStatus[] = [];

  // Step 1: Look for correct letters.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        char: guessChars[i],
        status: 'correct',
      };
      answerChars[i] = SOLVED_CHAR;
      guessChars[i] = SOLVED_CHAR;
    }
  }

  // Step 2: look for misplaced letters. If it's not misplaced,
  // it must be incorrect.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === SOLVED_CHAR) {
      continue;
    }

    let status: Status = 'missing';
    const misplacedIndex = answerChars.findIndex(
      (char) => char === guessChars[i]
    );
    if (misplacedIndex >= 0) {
      status = 'misplaced';
      answerChars[misplacedIndex] = SOLVED_CHAR;
    }

    result[i] = {
      char: guessChars[i],
      status,
    };
  }

  return result;
}

export async function checkWordExists(word: string): Promise<boolean> {
  // const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  // return response.status === 200;
  return Promise.resolve(words.includes(word.toLowerCase()));
}

export function filterWord(word: Word): boolean {
  return word.word.length >= MIN_WORD_LENGTH && word.word.length <= MAX_WORD_LENGTH;
}