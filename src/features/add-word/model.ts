import { createEffect, createEvent, sample } from "effector";
import { Word } from "entities/word";
import { addWordFx } from "entities/word/model/store";

export const addWordClicked = createEvent<React.MouseEvent>();
export const addWordFormSubmitted = createEvent<React.FormEvent<HTMLFormElement>>();

export const addWordFormSubmittedFx = createEffect(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    
    const id = crypto.randomUUID();

    const word: Word = {
        id,
        word: formData.get("word") as string,
        definitions: [{
            id: crypto.randomUUID(),
            definition: formData.get("definition") as string,
            wordId: id,
        }],
        sentences: [],
    };

    return word;
});

sample({
    clock: addWordFormSubmittedFx.doneData,
    target: addWordFx,
})
