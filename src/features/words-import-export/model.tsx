import { createEffect, createEvent, sample } from "effector";
import { WordEntity } from "entities/word";
import { FilesApi } from "shared/files/types";

type ImportExportModelDeps = {
  wordEntity: WordEntity;
  filesApi: FilesApi;
};

export const importWordsClicked = createEvent();
export const exportWordsClicked = createEvent();

export const createImportExportModel = ({
  wordEntity,
  filesApi,
}: ImportExportModelDeps) => {
  const exportWordsFx = createEffect(async () => {
    const words = await wordEntity.$wordStore.getState();

    filesApi.downloadFile("words.json", JSON.stringify(words));
  });

  const importWordsFx = createEffect(async () => {
    const file = await filesApi.readUserFile();
    const words = JSON.parse(file);
    await wordEntity.addWord(words);
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
