import { Word, WordDTO } from "../model/types";
import { UserApi } from "entities/user/api/types";

export interface WordApi {
  getWord: (id: string) => Promise<Word | undefined>;
  getWords: () => Promise<Word[]>;
  createWord: (word: WordDTO) => Promise<Word>;
  updateWord: (word: Word) => Promise<Word>;
  deleteWord: (id: string) => Promise<void>;
  uploadWords: (words: Word[]) => Promise<void>;
}

export interface WordApiDeps {
  userApi: UserApi;
}
