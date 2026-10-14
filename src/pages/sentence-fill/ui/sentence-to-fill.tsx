import { hideAnswerInSentence } from "../lib";

type Props = {
    answer: string;
    hintsCount?: number;
    showAnswer?: boolean;
    sentence: string;
}

export function SentenceToFill({
    answer,
    sentence,
    hintsCount,
    showAnswer,
}: Props) {
    const formatted = hideAnswerInSentence(sentence, answer, hintsCount, showAnswer);

    return (
        <span>{formatted}</span>
    )
}