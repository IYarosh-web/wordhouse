import { useGate, useUnit } from "effector-react";

import { addWordFormSubmittedFx } from "features/add-word";
import { Input, Button, Textarea } from "shared/ui";

import { AddWordGate } from "../model";

export function AddWordForm() {
  const [handleWordFormSubmitted] = useUnit([addWordFormSubmittedFx]);

  useGate(AddWordGate);

  return (
    <form className="flex flex-col gap-2 p-6" onSubmit={handleWordFormSubmitted}>
      <Input type="text" placeholder="Word" name="word" className="w-full" />
      <Input type="text" placeholder="Definition" name="definition" className="w-full" />
      <Input type="text" placeholder="Translation" name="translation" className="w-full" />
      <Textarea placeholder="Sentence" name="sentence" className="w-full" />
      <Button className="ml-auto px-4 py-2" type="submit">Add</Button>
    </form>
  );
}
