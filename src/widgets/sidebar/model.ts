import { createEffect, createEvent, createStore, sample } from "effector";
import { history } from "app/router/history";
import { loadWordsFx } from "entities/word/model/store";

export const itemFocused = createEvent<React.FocusEvent<HTMLButtonElement>>();

export const $lastFocusedItem = createStore<HTMLButtonElement | null>(null);

export const navigateToFocusedItemFx = createEffect((elem: React.FocusEvent<HTMLButtonElement>) => {
    if (elem.currentTarget.name === "add-word") {
        history.push("/dashboard/add-word");
    } else {
        history.push(`/dashboard/${elem.currentTarget.dataset.word}`);
    }
});

sample({
    clock: itemFocused,
    source: loadWordsFx.pending,
    filter: (loading) => !loading,
    fn: (_, elem) => elem,
    target: navigateToFocusedItemFx,
});

sample({
    clock: itemFocused,
    fn: (elem) => elem.currentTarget,
    target: $lastFocusedItem,
});