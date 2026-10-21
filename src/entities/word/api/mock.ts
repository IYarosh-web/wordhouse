import { Word } from "../model/types";
import { WordApi } from "./types";

export const createMockWordApi = (words: Word[]): WordApi => {
    let state = words;
    return {
        getWords: async () => state,
        getWord: async (id) => state.find(w => w.id === id),
        createWord: async (word) => {
            const newWord = {
                ...word,
                id: Math.random().toString(),
            }
            state.push(newWord);

            return newWord;
        },
        updateWord: async (word) => {
            state = state.map(w => w.id === word.id ? word : w);
            return word;
        },
        deleteWord: async (id) => {
            state = state.filter(w => w.id !== id);
        },
        uploadWords: async (words) => {
            state = words;
        }
    }
}