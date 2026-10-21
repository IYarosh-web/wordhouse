import { Word } from "./types";

export const mockWord = (word: Partial<Word>): Word => {
    return {
        id: word.id ?? Math.random().toString(),
        word: word.word ?? Math.random().toString(),
        translations: word.translations ?? [],
        definitions: word.definitions ?? [],
        sentences: word.sentences ?? [],
        createdAt: '',
        updatedAt: '',
    }
}

export const mockWords = (count: number): Word[] => {
    return new Array(count).fill(mockWord);
}
