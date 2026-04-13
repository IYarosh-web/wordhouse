// Words layer public API
// Export your word components here

import type { Word, Sentence, Definition } from "./model/types";
import { $wordStore, $uniqueWordsStore } from "./model/store";
import { wordsApi } from "./api";

export {wordClicked} from './model/contracts';

export { Word, Sentence, Definition, $wordStore, $uniqueWordsStore };

export { wordsApi };

export { isWordValid } from './model/lib';
