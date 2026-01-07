import { LetterStatus } from "./types";

export function checkLetters(
  guess: string,
  answer: string,
): {
  letter: string;
  status: LetterStatus;
}[] {
  // This constant is a placeholder that indicates we've successfully
  // dealt with this character (it's correct, or misplaced).
  const SOLVED_CHAR = "✓";

  if (!guess) {
    return [];
  }

  const guessChars = guess.toUpperCase().split("");
  const answerChars = answer.split("");

  const result: { letter: string; status: LetterStatus }[] = [];

  // Step 1: Look for correct letters.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        letter: guessChars[i],
        status: "correct",
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

    let status: LetterStatus = "missing";
    const misplacedIndex = answerChars.findIndex(
      (char) => char === guessChars[i],
    );
    if (misplacedIndex >= 0) {
      status = "misplaced";
      answerChars[misplacedIndex] = SOLVED_CHAR;
    }

    result[i] = {
      letter: guessChars[i],
      status,
    };
  }

  return result;
}

export function getPressedLetter(e: KeyboardEvent): string | null {
  const MAP = {
    KeyA: "A",
    KeyB: "B",
    KeyC: "C",
    KeyD: "D",
    KeyE: "E",
    KeyF: "F",
    KeyG: "G",
    KeyH: "H",
    KeyI: "I",
    KeyJ: "J",
    KeyK: "K",
    KeyL: "L",
    KeyM: "M",
    KeyN: "N",
    KeyO: "O",
    KeyP: "P",
    KeyQ: "Q",
    KeyR: "R",
    KeyS: "S",
    KeyT: "T",
    KeyU: "U",
    KeyV: "V",
    KeyW: "W",
    KeyX: "X",
    KeyY: "Y",
    KeyZ: "Z",
  };

  return MAP[e.code] || null;
}
