import { Word } from "./types";

export function isWordValid(word: Word): boolean {
    return Object.keys(word).length === 5 && !!word.id && !!word.translations.length && !!word.word;
}