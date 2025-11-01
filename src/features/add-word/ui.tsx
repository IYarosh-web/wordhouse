import { Button } from "shared/ui";
import { addWordClicked } from "./model";
import { useUnit } from "effector-react";

function AddWordButton() {
    const [handleAddWordClicked] = useUnit([addWordClicked]);

    return (
        <Button onClick={handleAddWordClicked}>Add Word</Button>
    );
}

export { AddWordButton };
