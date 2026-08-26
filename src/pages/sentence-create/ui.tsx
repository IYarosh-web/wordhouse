import { useGate, useUnit } from "effector-react"
import { $word, sentenceSubmitted, widgetGate } from "./model"
import { Button, Textarea } from "shared/ui";

export function SentenceCreateWidget() {
    const [word, formSubmit] = useUnit([$word, sentenceSubmitted]);

    useGate(widgetGate);
    
    return (
        <div>
            <h1>Sentence Create</h1>
            <p>Enter a sentence for the word: {word?.word}</p>
            <form onSubmit={formSubmit}>
                <Textarea name="sentence" />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}