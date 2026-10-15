import { combine, createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { WordApi } from "entities/word/api/types";
import React from "react";
import { randomFrom } from "shared/lib";

type WordBySentenceWidgetDeps = {
    wordsApi: WordApi
}

export const createWordBySentenceWidget = (deps: WordBySentenceWidgetDeps) => {
    const $answer = createStore('');
    const $revealCount = createStore(1);
    const $sentencesPool = createStore(['']);
    const $revealedSentences = combine($sentencesPool, $revealCount, (pool, hints) => pool.slice(0, hints));
    const $message = createStore('');
    
    const guessSubmitted = createEvent<React.FormEvent<HTMLFormElement>>();
    const hintRequested = createEvent();
    const gameRestartRequested = createEvent();

    const Gate = createGate();

    const gameRestartFx = createEffect(async () => {
        const words = await deps.wordsApi.getWords();
        const validWords = words.filter(w => w.sentences.length > 0);
        console.log({validWords});
        const word = randomFrom(validWords);

        return {
            word: word.word,
            sentences: word.sentences.map(s => s.sentence),
        }
    });
    
    $answer.reset(gameRestartRequested);
    $revealCount.reset(gameRestartRequested);
    $sentencesPool.reset(gameRestartRequested);
    $answer.reset(gameRestartRequested);
    $message.reset(gameRestartRequested);

    sample({
        clock: gameRestartRequested,
        target: gameRestartFx,
    })

    sample({
        clock: guessSubmitted,
        source: $answer,
        fn: (answer, event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            
            const guess = formData.get('guess');

            if (!guess || typeof guess !== 'string') {
                return;
            }

            if (guess === answer) {
                const guessField = event.currentTarget.elements.namedItem('guess');
                if (guessField instanceof HTMLInputElement) {
                    guessField.value = '';
                }

                return 'You\'ve won';
            }


            return 'Wrong guess';
        }
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
        fn: (state) => state.sentences,
        target: $sentencesPool,
    });

    sample({
        clock: Gate.open,
        target: gameRestartRequested,
    });

    return {
        $answer,
        $revealCount,
        $sentencesPool,
        $revealedSentences,
        $message,

        guessSubmitted,
        hintRequested,
        gameRestartRequested,

        Gate,
    }
}

