import { combine, createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { WordApi } from "entities/word/api/types";
import React from "react";
import { randomFrom } from "shared/lib";
import { GameStatus } from "shared/lib/types";

type WordByDefinitionWidgetDeps = {
    wordsApi: WordApi
}

export const createWordByDefinitionWidget = (deps: WordByDefinitionWidgetDeps) => {
    const $answer = createStore('');
    const $revealCount = createStore(1);
    const $definitionsPool = createStore(['']);
    const $revealedDefinitions = combine($definitionsPool, $revealCount, (pool, hints) => pool.slice(0, hints));
    const $message = createStore('');
    const $status = createStore<GameStatus>('running')
    
    const guessSubmitted = createEvent<React.FormEvent<HTMLFormElement>>();
    const hintRequested = createEvent();
    const gameRestartRequested = createEvent();

    const Gate = createGate();

    const gameRestartFx = createEffect(async () => {
        const words = await deps.wordsApi.getWords();
        const validWords = words.filter(w => w.definitions.length > 0);
        const word = randomFrom(validWords);

        return {
            word: word.word,
            definitions: word.definitions.map(d => d.definition),
        }
    });
    
    $answer.reset(gameRestartRequested);
    $revealCount.reset(gameRestartRequested);
    $definitionsPool.reset(gameRestartRequested);
    $answer.reset(gameRestartRequested);
    $message.reset(gameRestartRequested);
    $status.reset(gameRestartRequested);

    sample({
        clock: gameRestartRequested,
        target: gameRestartFx,
    })

    sample({
        clock: guessSubmitted,
        source: $answer,
        fn: (answer, event): GameStatus => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            
            const guess = formData.get('guess');

            if (!guess || typeof guess !== 'string') {
                return 'running';
            }

            if (guess.toUpperCase() === answer.toUpperCase()) {
                const guessField = event.currentTarget.elements.namedItem('guess');
                if (guessField instanceof HTMLInputElement) {
                    guessField.value = '';
                }

                return 'won';
            }


            return 'running';
        },
        target: $status,
    });

    sample({
        clock: hintRequested,
        source: $revealCount,
        fn: (c) => c + 1,
        target: $revealCount,
    });

    sample({
        clock: gameRestartFx.doneData,
        fn: (state) => state.word,
        target: $answer,
    });

    sample({
        clock: gameRestartFx.doneData,
        fn: (state) => state.definitions,
        target: $definitionsPool,
    });

    sample({
        clock: Gate.open,
        target: gameRestartRequested,
    });

    return {
        $answer,
        $revealCount,
        $definitionsPool,
        $revealedDefinitions,
        $message,
        $status,

        guessSubmitted,
        hintRequested,
        gameRestartRequested,

        Gate,
    }
}

