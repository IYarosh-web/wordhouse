import { createEvent } from "effector";
import { Word } from "./types";

export const wordClicked = createEvent<Word>();
