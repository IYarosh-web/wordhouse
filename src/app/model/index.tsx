import { sample } from "effector";
import { loadWords } from "entities/word/model/store";
import { appInitialized } from "shared/contracts";

sample({
  clock: appInitialized,
  target: loadWords,
});
