import { useUnit } from "effector-react";
import { Button, FocusOnCtrlKey, Input } from "shared/ui";
import { addWordFormSubmittedFx } from "features/add-word";

function AddWordModal() {
    const [handleWordFormSubmitted] = useUnit([addWordFormSubmittedFx]);
    
    return (
        <>
            <div className={`left flex flex-col border-2 border-gray-300 gap-2 p-4`}>
                <h2 className="font-bold text-lg text-center">Add new word</h2>
                <form action="#" onSubmit={handleWordFormSubmitted} className="space-y-2">
                    <FocusOnCtrlKey keyCode="ArrowRight">
                        <Input className="w-full border-1 border-gray-300 p-1" type="text" required name="word" placeholder="Word" />
                    </FocusOnCtrlKey>
                    <Input className="w-full border-1 border-gray-300 p-1" type="text" required name="definition" placeholder="Definition" />
                    <div className="flex gap-4">
                        <Button className="border-1 border-gray-300 p-1" type="submit">Add word</Button>
                    </div>
                </form>
            </div>
            <div className={`right flex flex-col border-2 border-gray-300 gap-2 p-4`} />
        </>
    );
}

export { AddWordModal };