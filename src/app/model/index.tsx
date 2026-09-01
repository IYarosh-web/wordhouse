import { sample } from "effector";
import { wordEntity } from "entities/word";
import { appInitialized } from "shared/contracts";
import "shared/routing";

sample({
  clock: appInitialized,
  target: wordEntity.loadWords,
});
