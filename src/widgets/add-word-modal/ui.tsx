import { useUnit } from "effector-react";
import { Button, FocusOnCtrlKey, Input } from "shared/ui";
import { addWordFormSubmittedFx } from "features/add-word";

function AddWordModal() {
    const [handleWordFormSubmitted] = useUnit([addWordFormSubmittedFx]);
    
    return (
        <div className="flex flex-col gap-2 p-4">
            <h2 className="font-bold">Add new word</h2>
            <form action="#" onSubmit={handleWordFormSubmitted} className="space-y-2">
                <FocusOnCtrlKey keyCode="ArrowRight">
                    <Input className="w-full border-1 border-gray-300 p-1" type="text" required name="word" placeholder="Word" />
                </FocusOnCtrlKey>
                <Input className="w-full border-1 border-gray-300 p-1" type="text" required name="definition" placeholder="Definition" />
                <div className="flex gap-4">
                    <Button type="submit">Add word</Button>
                </div>
            </form>
        </div>
    );
}

export { AddWordModal };