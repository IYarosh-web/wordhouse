import { useGate, useUnit } from "effector-react";

import { Input, Button, Textarea } from "shared/ui";

import { addWord } from "../model";
export function AddWordForm() {
  const [handleWordFormSubmitted] = useUnit([addWord.formSubmitted]);

  useGate(addWord.Gate);

  return (
    <form
      className="flex flex-col gap-2 p-6"
      onSubmit={handleWordFormSubmitted}
    >
      <Input type="text" placeholder="Word" name="word" className="w-full" />
      <Input
        type="text"
        placeholder="Definition"
        name="definition"
        className="w-full"
      />
      <Input
        type="text"
        placeholder="Translation"
        name="translation"
        className="w-full"
      />
      <Textarea placeholder="Sentence" name="sentence" className="w-full" />
      <Button className="ml-auto px-4 py-2" type="submit">
        Add
      </Button>
    </form>
  );
}
