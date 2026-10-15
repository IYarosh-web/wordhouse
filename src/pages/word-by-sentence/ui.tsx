import { useGate, useUnit } from "effector-react";
import { Button, Input } from "shared/ui";
import { wordBySentenceModel } from ".";

export function GuessWordBySentenceWidget() {
    const [submit] = useUnit([wordBySentenceModel.guessSubmitted]);

    useGate(wordBySentenceModel.Gate);

    return (
        <form onSubmit={submit} className="flex flex-col gap-2">
            <Input required name="guess" placeholder="Your guess" />
            <Button type="submit">Submit</Button>
        </form>
    )
}