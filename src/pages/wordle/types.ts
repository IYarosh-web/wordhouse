export type Guess = {
  id: string;
  value: string;
}

export type LetterStatus = {
  char: string;
  status: Status;
}

export type GameStatus = "won" | "lost" | "running";

export type Status = "misplaced" | "correct" | "missing";
