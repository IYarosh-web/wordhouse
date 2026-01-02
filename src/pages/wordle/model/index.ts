import { createEvent, createStore, sample } from "effector";
import { Answer, GameState, LetterStatus, UserGuess } from "./types";
import { $wordStore } from "entities/word";
import { FormEvent } from "react";
import { checkLetters } from "./helpers";

export const $answer = createStore<Answer>('');
export const $userGuesses = createStore<UserGuess[]>([]);
export const $userInput = createStore<string>('');
export const $gameState = createStore<GameState>('initial');
export const $maxGuesses = createStore<number>(6);
export const $letterStatuses = createStore<Record<string, LetterStatus>>({});

export const gameInitialized = createEvent();
export const userGuessAdded = createEvent<UserGuess>();
export const userInputChanged = createEvent<string>();
export const userInputSubmitted = createEvent<FormEvent<HTMLFormElement>>();

$userGuesses.watch(console.log);
userGuessAdded.watch(console.log);
userInputChanged.watch(console.log);

userInputSubmitted.watch(e => e.preventDefault());

sample({
    clock: userGuessAdded,
    source: $userGuesses,
    fn: (guesses, guess) => [...guesses, guess],
    target: $userGuesses,
});

sample({
    clock: userGuessAdded,
    source: {answer: $answer, statuses: $letterStatuses},
    fn: ({answer, statuses}, guess) => {
        const patch = checkLetters(guess, answer);
        patch.forEach((item) => {
            switch(statuses[item.letter]) {
                case 'misplaced':
                case undefined:
                    statuses[item.letter] = item.status as LetterStatus;
                    break;
                default:
                    return statuses;
            }
        });
        return statuses;
    },
    target: $letterStatuses,
});

sample({
    clock: userInputChanged,
    source: $answer,
    fn: (answer, input) => input.slice(0, answer.length),
    target: $userInput,
});

sample({
    clock: userGuessAdded,
    source: {guesses: $userGuesses, maxGuesses: $maxGuesses, answer: $answer},
    fn: ({guesses, maxGuesses, answer}, newGuess) => {        
        if (newGuess === answer) {
            return 'won';
        }

        if (guesses.length >= maxGuesses) {
            return 'lost';
        }

        return 'playing';

    },
    target: $gameState,
});

sample({
    clock: gameInitialized,
    source: $wordStore,
    fn: (words) => words[Math.floor(Math.random() * words.length)].word.toUpperCase(),
    target: $answer,
});

sample({
    clock: userInputSubmitted,
    fn: (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const userInput = formData.get('userInput');

        if (typeof userInput !== 'string') {
            return '';
        }

        return userInput;
    },
    target: userGuessAdded,
});

sample({
    clock: userInputSubmitted,
    fn: () => '',
    target: $userInput,
});

