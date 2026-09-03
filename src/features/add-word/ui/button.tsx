import { Button } from "shared/ui";
import { useUnit } from "effector-react";

import { addWord } from "../model";

function AddWordButton() {
  const [handleAddWordClicked] = useUnit([addWord.clicked]);

  return <Button onClick={handleAddWordClicked}>Add Word</Button>;
}

export { AddWordButton };
