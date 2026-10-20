import { wordsApi } from "entities/word/api";
import { createWordleFactory } from "./model";

export { WidgetWordle } from "./ui/ui";

export const wordleModel = createWordleFactory({wordsApi});