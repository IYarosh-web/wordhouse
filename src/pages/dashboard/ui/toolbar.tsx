import { Button } from "shared/ui";

import { useUnit } from "effector-react";
import { addWordClicked } from "features/desk/model";

export function Toolbar() {
  const [addWordClick] = useUnit([addWordClicked])

  return (
    <div className="w-fit p-m">
      <Button onClick={addWordClick}>Add word</Button>
    </div>
  )
}