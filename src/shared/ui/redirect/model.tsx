import { createEvent, createStore, sample } from "effector";
import { redirectTo } from "shared/contracts";

export const $isOpen = createStore(false);
export const $redirectLocation = createStore<string>('');

export const changeLocation = createEvent<string>();
export const locationChanged = createEvent();

sample({
    clock: redirectTo,
    target: $redirectLocation,
});

sample({
    clock: redirectTo,
    fn: () => true,
    target: $isOpen,
});

sample({
    clock: locationChanged,
    fn: () => false,
    target: $isOpen,
});
