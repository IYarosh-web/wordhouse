import { Button } from "shared/ui";
import { useUnit } from "effector-react";

import { addWordClicked } from "../model";

function AddWordButton() {
  const [handleAddWordClicked] = useUnit([addWordClicked]);

  return <Button onClick={handleAddWordClicked}>Add Word</Button>;
}

export { AddWordButton };
