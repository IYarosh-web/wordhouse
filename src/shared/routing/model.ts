import { createStore, sample } from "effector";

import {
  closeModal,
  locationChanged,
  openModal,
  redirectTo,
  type AppLocation,
} from "shared/contracts";

import { MODAL_PARAM, MODAL_SEARCH_KEYS } from "./const";

const initialLocation = (): AppLocation => ({
  pathname: window.location.pathname,
  search: window.location.search,
});

export const $location = createStore<AppLocation>(initialLocation());

sample({
  clock: locationChanged,
  target: $location,
});

export const $modal = $location.map(({ search }) =>
  new URLSearchParams(search).get(MODAL_PARAM),
);

export const $wordParam = $location.map(
  ({ search }) => new URLSearchParams(search).get("word") ?? "",
);

function toUrl(pathname: string, search: URLSearchParams) {
  const query = search.toString();
  return query ? `${pathname}?${query}` : pathname;
}

function stripModalKeys(search: string) {
  const next = new URLSearchParams(search);
  for (const key of MODAL_SEARCH_KEYS) {
    next.delete(key);
  }
  return next;
}

sample({
  clock: openModal,
  source: $location,
  fn: ({ pathname, search }, { name, params }) => {
    const next = stripModalKeys(search);
    next.set(MODAL_PARAM, name);

    for (const [key, value] of Object.entries(params ?? {})) {
      next.set(key, value);
    }

    return toUrl(pathname, next);
  },
  target: redirectTo,
});

sample({
  clock: closeModal,
  source: $location,
  fn: ({ pathname, search }) => toUrl(pathname, stripModalKeys(search)),
  target: redirectTo,
});
