import { useGate, useUnit } from "effector-react";

import { addWordFormSubmittedFx } from "features/add-word";
import { Input, Button } from "shared/ui";

import { AddWordGate } from "../model";

export function AddWord() {
  const [handleWordFormSubmitted] = useUnit([addWordFormSubmittedFx]);

  useGate(AddWordGate);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleWordFormSubmitted}>
      <h3 className="text-2xl font-bold text-center">Add Word</h3>
      <Input type="text" placeholder="Word" name="word" className="w-full" />
      <Input type="text" placeholder="Definition" name="definition" className="w-full" />
      <Input type="text" placeholder="Translation" name="translation" className="w-full" />
      <Input type="text" placeholder="Sentence" name="sentence" className="w-full" />
      <Button type="submit">Add</Button>
    </form>
  );
}
