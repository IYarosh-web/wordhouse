type Word = {
    id: string;
    word: string;
    definitions: Definition[];
    sentences?: Sentence[];
}

type Definition = {
    id: string;
    definition: string;
    wordId: string;
}

type Sentence = {
    id: string;
    sentence: string;
    wordId: string;
}

export type { Word, Sentence, Definition };