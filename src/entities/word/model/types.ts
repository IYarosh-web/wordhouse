type Word = {
  id: string;
  word: string;
  translations: Translation[];
  definitions: Definition[];
  sentences?: Sentence[];
};

type Definition = {
  id: string;
  definition: string;
  wordId: string;
};

type Translation = {
  id: string;
  translation: string;
  wordId: string;
};

type Sentence = {
  id: string;
  sentence: string;
  wordId: string;
};

export type { Word, Sentence, Definition, Translation };
