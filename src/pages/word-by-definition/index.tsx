import { wordsApi } from 'entities/word/api';
import { createWordByDefinitionWidget } from './model';

export { GuessWordByDefinitionWidget } from './ui';

export const wordByDefinitionModel = createWordByDefinitionWidget({
    wordsApi: wordsApi
});
