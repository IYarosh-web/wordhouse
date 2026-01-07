import { createEvent, sample } from "effector";
import { loadWordsFx } from "entities/word/model/store";

export const appInitialized = createEvent();
export const locationChanged = createEvent<string>();

sample({
  clock: appInitialized,
  target: loadWordsFx,
});
