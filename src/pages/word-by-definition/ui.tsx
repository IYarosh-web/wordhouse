import { useGate, useUnit } from "effector-react";
import { Button, FocusOnCtrlKey, Input, KeyboardShortcut } from "shared/ui";
import { wordByDefinitionModel } from ".";
import { WordLinkComponent } from "features/word-link";

export function GuessWordByDefinitionWidget() {
    const [definitions, status, answer, requestHint, submit, restart] = useUnit([
        wordByDefinitionModel.$revealedDefinitions,
        wordByDefinitionModel.$status,
        wordByDefinitionModel.$answer,
        wordByDefinitionModel.hintRequested,
        wordByDefinitionModel.guessSubmitted,
        wordByDefinitionModel.gameRestartRequested,
    ]);

    useGate(wordByDefinitionModel.Gate);

    return (
        <div className="w-125 m-auto text-center">
            <section>
                {status === 'won' && <span>You've won! The answer is <WordLinkComponent autoFocus word={answer} /></span>}
                {definitions.map(s => (
                    <p>{s}</p>
                ))}
            </section>
            <form onSubmit={submit} className="flex items-center flex-col gap-2">
                <div className="flex gap-2 m-2">
                    <FocusOnCtrlKey keyCode="ArrowRight">
                        <Input required name="guess" placeholder="Your guess" />
                    </FocusOnCtrlKey>
                    <KeyboardShortcut keys={['ArrowRight']} />
                </div>
                <div className="flex gap-2">
                    <Button className="py-1 px-2" type="submit">Submit</Button>
                    <Button className="py-1 px-2" onClick={requestHint}>Hint</Button>
                    <Button className="py-1 px-2" onClick={restart}>Restart</Button>
                </div>
            </form>
        </div>
    )
}