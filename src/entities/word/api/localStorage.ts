import { WordApi } from "./types";

export const localStorageWordsApi: WordApi = {
  getWords: () => {
    return JSON.parse(localStorage.getItem("words") || "[]");
  },
  createWord: async (word) => {
    const words = await localStorageWordsApi.getWords();
    words.push(word);
    localStorage.setItem("words", JSON.stringify(words));
    return word;
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
};
