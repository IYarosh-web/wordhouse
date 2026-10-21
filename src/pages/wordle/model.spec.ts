import { allSettled, fork } from "effector";

import { createMockWordApi } from "entities/word/api/mock";
import { mockWord } from "entities/word/model/mock";
import { Word } from "entities/word";

import { describe, expect, test } from "vitest";
import { createWordleFactory } from "./model";

const MOCK_WORDS: Word[] = [
    mockWord({ word: 'Bash' }),
    mockWord({ word: 'Quaint' }),
    mockWord({ word: 'Toolongtobevalid' }),
]

const wordsApi = createMockWordApi(MOCK_WORDS);

describe('Wordle factory', () => {
    test('Should start game with empty state', () => {
        const scope = fork();

        const model = createWordleFactory({ wordsApi });

        allSettled(model.gameStarted, { scope });

        expect(scope.getState(model.$answer)).not.toBeFalsy();
    });
});