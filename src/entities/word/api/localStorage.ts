import { WordApi } from "./types";
import { Word } from "../model/types";

export const localStorageWordsApi: WordApi = {
  getWords: () => {
    return JSON.parse(localStorage.getItem("words") || "[]");
  },
  createWord: async (word) => {
    const words = await localStorageWordsApi.getWords();

    const newWord: Word = {
      ...word,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    words.push(newWord);
    localStorage.setItem("words", JSON.stringify(words));
    return newWord;
  },
  updateWord: async (word) => {
    const words = await localStorageWordsApi.getWords();
    const index = words.findIndex((w) => w.id === word.id);
    words[index] = word;
    localStorage.setItem("words", JSON.stringify(words));
    return word;
  },
  deleteWord: async (id) => {
    const words = await localStorageWordsApi.getWords();
    const index = words.findIndex((w) => w.id === id);
    words.splice(index, 1);
    localStorage.setItem("words", JSON.stringify(words));
  },
  getWord: async (id) => {
    const words = await localStorageWordsApi.getWords();
    return words.find((w) => w.id === id);
  },
  uploadWords: async (words) => {
    localStorage.setItem("words", JSON.stringify(words));
  }
};
