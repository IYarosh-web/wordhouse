import { createEvent } from "effector";

export type AppLocation = {
  pathname: string;
  search: string;
};

export type OpenModalPayload = {
  name: string;
  params?: Record<string, string>;
};

export const redirectTo = createEvent<string>();
export const appInitialized = createEvent();
export const locationChanged = createEvent<AppLocation>();
export const openModal = createEvent<OpenModalPayload>();
export const closeModal = createEvent();
