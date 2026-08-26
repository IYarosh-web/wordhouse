import { useGate, useUnit } from "effector-react"
import { $word, sentenceSubmitted, widgetGate } from "./model"
import { Button, Textarea } from "shared/ui";

export function SentenceCreateWidget() {
    const [word, formSubmit] = useUnit([$word, sentenceSubmitted]);

    useGate(widgetGate);
    
    return (
        <div className="flex flex-col gap-2 p-6 h-full items-center">
            <h3 className="text-2xl text-center font-bold">Sentence create</h3>
            <p>Enter a sentence for the word: {word?.word}</p>
            <form onSubmit={formSubmit} className="contents">
                <Textarea name="sentence" className="w-full max-w-xl" />
                <Button className="px-2 py-1" type="submit">Submit</Button>
            </form>
        </div>
    )
}