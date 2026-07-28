import { createEvent, createStore, sample } from "effector";
import { $wordStore } from "entities/word";
import { getSentenceToFill } from "./lib";
import { createGate } from "effector-react";
import { GameStatus } from "shared/lib/types";

export const $answer = createStore('');
export const $sentenceToFill = createStore('');
export const $showAnswer = createStore(false);
export const $hintsCount = createStore(0);
export const $gameStatus = createStore<GameStatus>('running');

export const gameRestarted = createEvent();
export const guessSubmitted = createEvent<React.FormEvent<HTMLFormElement>>();
export const hintRequested = createEvent();

export const gameGate = createGate();

const gamePrepared = sample({
    clock: [gameGate.open, gameRestarted],
    source: $wordStore,
    fn: getSentenceToFill,
});

sample({
    clock: gamePrepared,
    fn: ({ sentence }) => sentence,
    target: $sentenceToFill,
});

sample({
    clock: gamePrepared,
    fn: ({ word }) => word,
    target: $answer,
});

sample({
    clock: hintRequested,
    source: $hintsCount,
    fn: (hintsCount) => hintsCount + 1,
    target: $hintsCount,
});

sample({
    clock: guessSubmitted, 
    source: $answer,
    fn: (answer, event) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        const guess = formData.get('guess');
        if (typeof guess !== 'string') {
            return 'lost';
        }

        return guess === answer ? 'won' : 'lost';
    },
    target: $answer,
});

sample({
    clock: guessSubmitted,
    source: $gameStatus,
    fn: (gameStatus) => gameStatus === 'running' ? 'won' : gameStatus,
    target: $gameStatus,
});