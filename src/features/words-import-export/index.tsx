import { wordsApi } from "entities/word";
import { createImportExportModel } from "./model";
import { filesApi } from "shared/files";

export const wordsImportExportModel = createImportExportModel({
  wordsApi: wordsApi,
  filesApi: filesApi,
});
