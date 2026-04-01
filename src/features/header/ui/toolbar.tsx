import { Button, Input } from "shared/ui";

import { useUnit } from "effector-react";
import { addWordClicked } from "features/add-word";

export function Toolbar() {

  const [addWordClick] = useUnit([addWordClicked])

  return (
    <div
      className="flex gap-4 w-fit p-m"
    >
      <Button size="large" onClick={addWordClick}>Add word</Button>
      <Input size="large" placeholder="Search word..." />
    </div>
  )
}