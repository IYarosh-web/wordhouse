import { useUnit } from "effector-react";
import { openModal } from "shared/contracts";
import { Button } from "shared/ui";
import { $paramsWord } from "../model";

export function EmptyWordPlaceholder() {
  const [modal, word] = useUnit([openModal, $paramsWord]);

  if (!word) return null;

  return (
    <div className="flex flex-col justify-center items-center">
      <span>Hmm, couldn't find this word. Wanna add it?</span>
      <Button onClick={() => modal({ name: "add-word", params: { word } })}>Add {word} to my dictionary</Button>
    </div>
  )
}