import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { $wordStore, createSentence, EMPTY_WORD, updateWord, Word } from "entities/word";
import { randomFrom } from "shared/lib";

export const $word = createStore<Word>(EMPTY_WORD);

export const gameStarted = createEvent();
export const sentenceSubmitted = createEvent<React.FormEvent<HTMLFormElement>>();

export const widgetGate = createGate();

sample({
    clock: widgetGate.open,
    target: gameStarted,
});

sample({
    clock: gameStarted,
    source: $wordStore,
    fn: words => (
        randomFrom(words)
    ),
    target: $word,
});

sample({
    clock: sentenceSubmitted,
    source: $word,
    filter: word => word !== undefined,
    fn: (word, e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const sentence = formData.get("sentence") as string;

        word.sentences = [
            ...word.sentences,
            createSentence(word.id, sentence),
        ]
        
        return word;
    },
    target: updateWord,
})