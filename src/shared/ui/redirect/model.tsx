import { createEvent, createStore, sample } from "effector";

export const $isOpen = createStore(false);
export const redirectLocation = createStore<string | null>(null);

export const changeLocation = createEvent<string>();
export const locationChanged = createEvent();

sample({
    clock: changeLocation,
    target: redirectLocation,
});

sample({
    clock: changeLocation,
    fn: () => true,
    target: $isOpen,
});

sample({
    clock: locationChanged,
    fn: () => false,
    target: $isOpen,
});
