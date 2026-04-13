import { Word } from "../model/types";

export interface WordApi {
  getWord: (id: string) => Promise<Word | undefined>;
  getWords: () => Promise<Word[]>;
  createWord: (word: Word) => Promise<Word>;
  updateWord: (word: Word) => Promise<Word>;
  deleteWord: (id: string) => Promise<void>;
  uploadWords: (words: Word[]) => Promise<void>;
}
