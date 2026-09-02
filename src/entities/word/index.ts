// Words layer public API
// Export your word components here

import type {
  Word,
  Sentence,
  Translation,
  Definition,
  WordDTO,
} from "./model/types";
import { createWordEntity } from "./model/store";
import { wordsApi } from "./api";

export { Word, Sentence, Translation, Definition, WordDTO };

export { isWordValid, createSentence, EMPTY_WORD } from "./model/lib";

export const wordEntity = createWordEntity({ wordsApi });

export type WordEntity = ReturnType<typeof createWordEntity>;
