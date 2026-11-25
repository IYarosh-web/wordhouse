import { allSettled, fork, Scope } from "effector";

import { createMockWordApi } from "entities/word/api/mock";
import { mockWord } from "entities/word/model/mock";
import { Word } from "entities/word";

import { describe, expect, test as baseTest } from "vitest";
import { createWordleFactory } from "./model";

const ANSWER = 'Quaint';

const MOCK_WORDS: Word[] = [
    mockWord({ word: ANSWER }),
]

interface WordleTestContext {
    scope: Scope;
    model: ReturnType<typeof createWordleFactory>;
}

const test = baseTest.extend<WordleTestContext>({
    scope: async ({}, use) => {
        const scope = fork();
        await use(scope);
    },
    model: async ({}, use) => {
        const model = createWordleFactory({ wordsApi });
        await use(model);
    },
});


const wordsApi = createMockWordApi(MOCK_WORDS);

describe('Wordle factory', () => {
    test('Should start game with empty state', async ({ scope, model }) => {
        await allSettled(model.gameStarted, { scope });

        expect(scope.getState(model.$answer).word).toBe(ANSWER);
    });

    test('Should handle char input', async ({ scope, model }) => {
        await allSettled(model.gameStarted, { scope });
        await allSettled(model.newInputCharAdded, { scope, params: 'i' });

        expect(scope.getState(model.$userInput)).toBe('i');
    });
});