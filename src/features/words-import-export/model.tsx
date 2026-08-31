import { createEffect, createEvent, sample } from "effector";
import { WordApi } from "entities/word/api/types";
import { FilesApi } from "shared/files/types";

type ImportExportModelDeps = {
  wordsApi: WordApi;
  filesApi: FilesApi;
};

export const importWordsClicked = createEvent();
export const exportWordsClicked = createEvent();

export const createImportExportModel = ({
  wordsApi,
  filesApi,
}: ImportExportModelDeps) => {
  const exportWordsFx = createEffect(async () => {
    const words = await wordsApi.getWords();

    filesApi.downloadFile("words.json", JSON.stringify(words));
  });

  const importWordsFx = createEffect(async () => {
    const file = await filesApi.readUserFile();
    const words = JSON.parse(file);
    await wordsApi.uploadWords(words);
  });

  const importWordsClicked = createEvent();
  const exportWordsClicked = createEvent();

  sample({
    clock: importWordsClicked,
    target: importWordsFx,
  });

  sample({
    clock: exportWordsClicked,
    target: exportWordsFx,
  });

  return {
    importWordsClicked,
    exportWordsClicked,
  };
};
