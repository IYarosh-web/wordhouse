import { Button } from "shared/ui";
import { addWordClicked, AddWordGate } from "./model";
import { useGate, useUnit } from "effector-react";

function AddWordButton() {
    const [handleAddWordClicked] = useUnit([addWordClicked]);

    useGate(AddWordGate);

    return (
        <Button onClick={handleAddWordClicked}>Add Word</Button>
    );
}

export { AddWordButton };
