import { createEvent } from "effector";
import { Word } from "entities/word/model/types";

export const wordClicked = createEvent<Word['word']>();
export const wordFocused = createEvent<Word['word']>();