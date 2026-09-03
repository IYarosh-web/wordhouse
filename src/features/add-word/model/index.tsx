import { createAddWordFactory } from "./model";
import { wordEntity } from "entities/word";

const addWord = createAddWordFactory({
  wordEntity: wordEntity,
});

export { addWord };
