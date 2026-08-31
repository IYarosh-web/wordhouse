export const MODAL_PARAM = "modal";

export const MODALS = {
  addWord: "add-word",
  editWord: "edit-word",
} as const;

export type ModalName = (typeof MODALS)[keyof typeof MODALS];

export const MODAL_SEARCH_KEYS = [MODAL_PARAM, "word"] as const;

export function modalSearch(name: string, params?: Record<string, string>) {
  const search = new URLSearchParams();
  search.set(MODAL_PARAM, name);

  for (const [key, value] of Object.entries(params ?? {})) {
    search.set(key, value);
  }

  return `?${search.toString()}`;
}
