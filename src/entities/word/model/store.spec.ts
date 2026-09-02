import { describe, expect, test, vi } from "vitest";
import { createWordEntity } from "./store";
import { allSettled, createWatch, fork } from "effector";
import { Word } from "../model/types";
import { WordApi } from "../api/types";

const word: Word = {
  id: "1",
  word: "house",
  translations: [],
  definitions: [],
  sentences: [],
  createdAt: "",
  updatedAt: "",
};

function createMockApi(overrides: Partial<WordApi> = {}): WordApi {
  return {
    getWord: vi.fn(),
    getWords: vi.fn().mockResolvedValue([]),
    createWord: vi.fn().mockResolvedValue(word),
    updateWord: vi.fn().mockImplementation(async (w) => w),
    deleteWord: vi.fn().mockResolvedValue(undefined),
    uploadWords: vi.fn(),
    ...overrides,
  };
}
describe("createWordEntity", () => {
  test("starts empty and idle", () => {
    const entity = createWordEntity({ wordsApi: createMockApi() });
    const scope = fork();
    expect(scope.getState(entity.$wordStore)).toEqual([]);
    expect(scope.getState(entity.$isLoading)).toBe(false);
  });

  test("loadWords fills the store and fires wordsLoaded", async () => {
    const wordsApi = createMockApi({
      getWords: vi.fn().mockResolvedValue([word]),
    });
    const entity = createWordEntity({ wordsApi });
    const scope = fork();
    const onLoaded = vi.fn();

    createWatch({ unit: entity.wordsLoaded, fn: onLoaded, scope });

    await allSettled(entity.loadWords, { scope });

    expect(wordsApi.getWords).toHaveBeenCalledOnce();
    expect(scope.getState(entity.$wordStore)).toEqual([word]);
    expect(onLoaded).toHaveBeenCalledWith([word]);
    expect(scope.getState(entity.$isLoading)).toBe(false);
  });

  test("addWord appends after the API succeeds", async () => {
    const wordsApi = createMockApi();
    const entity = createWordEntity({ wordsApi });
    const scope = fork();
    const onAdded = vi.fn();

    createWatch({ unit: entity.wordAdded, fn: onAdded, scope });

    await allSettled(entity.addWord, { scope, params: word });

    expect(wordsApi.createWord).toHaveBeenCalledWith(word);
    expect(scope.getState(entity.$wordStore)).toEqual([word]);
    expect(onAdded).toHaveBeenCalledWith(word);
  });

  test("updateWord replaces the matching item", async () => {
    const updated = { ...word, word: "home" };
    const wordsApi = createMockApi({
      getWords: vi.fn().mockResolvedValue([word]),
    });
    const entity = createWordEntity({ wordsApi });
    const scope = fork();
    const onUpdated = vi.fn();

    createWatch({ unit: entity.wordUpdated, fn: onUpdated, scope });

    await allSettled(entity.loadWords, { scope });
    await allSettled(entity.updateWord, { scope, params: updated });

    expect(scope.getState(entity.$wordStore)).toEqual([updated]);
    expect(onUpdated).toHaveBeenCalledWith(updated);
  });

  test("deleteWord removes by id", async () => {
    const wordsApi = createMockApi({
      getWords: vi.fn().mockResolvedValue([word]),
    });
    const entity = createWordEntity({ wordsApi });
    const scope = fork();
    const onDeleted = vi.fn();

    createWatch({ unit: entity.wordDeleted, fn: onDeleted, scope });

    await allSettled(entity.loadWords, { scope });
    await allSettled(entity.deleteWord, { scope, params: word.id });

    expect(wordsApi.deleteWord).toHaveBeenCalledWith("1");
    expect(scope.getState(entity.$wordStore)).toEqual([]);
    expect(onDeleted).toHaveBeenCalledWith(word.id);
  });
});
