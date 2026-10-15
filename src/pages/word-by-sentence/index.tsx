import { wordsApi } from 'entities/word/api';
import { createWordBySentenceWidget } from './model';

export { GuessWordBySentenceWidget } from './ui';

export const wordBySentenceModel = createWordBySentenceWidget({
    wordsApi: wordsApi
});
