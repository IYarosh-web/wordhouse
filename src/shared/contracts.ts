import { createEvent } from "effector";

export const redirectTo = createEvent<string>();
export const appInitialized = createEvent();
export const locationChanged = createEvent<string>();
