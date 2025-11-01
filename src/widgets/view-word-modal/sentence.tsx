import { useEffect, useRef } from "react";

type Props = {
    word: string;
    sentence: string;
}

function Sentence({ word, sentence }: Props) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (ref.current) {
            const html = ref.current.innerHTML;
            const wordPosition = html.toUpperCase().indexOf(word.toUpperCase());
            const originalWord = html.substring(wordPosition, wordPosition + word.length);
            if (wordPosition !== -1) {
                const beforeWord = html.substring(0, wordPosition);
                const afterWord = html.substring(wordPosition + word.length);
                ref.current.innerHTML = beforeWord + `<span class="text-blue-500">${originalWord}</span>` + afterWord;
            }
        }
    }, []);

    return (
        <span ref={ref}>{sentence}</span>
    );
}

export { Sentence };