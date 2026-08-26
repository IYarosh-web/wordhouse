import { Sentence, Word, WordDTO } from "./types";

export function isWordValid(word: Word): boolean {
    if (Object.keys(word).length !== 5) {
        return false;
    }
    if (!word.id || !word.word) {
        return false;
    }
    if (word.word.startsWith(' ') || word.word.endsWith(' ')) {
        return false;
    }
    return true;
}

export function isWordValidDTO(word: WordDTO): boolean {
    if (!word.word) {
        return false;
    }
    if (word.word.startsWith(' ') || word.word.endsWith(' ')) {
        return false;
    }
    return true;
}

export const createSentence = (wordId: Word['id'], sentence: string): Sentence => ({
    id: crypto.randomUUID(),
    wordId,
    sentence,
});

export const EMPTY_WORD: Readonly<Word> = Object.freeze({
    id: '',
    word: '',
    translations: [],
    definitions: [],
    sentences: [],
    createdAt: '',
    updatedAt: '',
});