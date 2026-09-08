import { useGate, useUnit } from "effector-react";
import { useLocation } from "react-router";

import { Input, Button, Textarea } from "shared/ui";

import { addWord } from "../model";

export function AddWordForm() {
  const location = useLocation();
  
  const params = new URLSearchParams(location.search);

  const [handleWordFormSubmitted] = useUnit([addWord.formSubmitted]);

  useGate(addWord.Gate);

  return (
    <form
      className="flex flex-col gap-2 p-6"
      onSubmit={handleWordFormSubmitted}
    >
      <Input type="text" placeholder="Word" name="word" defaultValue={params.get('word') || ''} className="w-full" />
      <Input
        type="text"
        placeholder="Definition"
        name="definition"
        className="w-full"
        defaultValue={params.get('definition') || ''}
      />
      <Input
        type="text"
        placeholder="Translation"
        name="translation"
        className="w-full"
        defaultValue={params.get('translation') || ''}
      />
      <Textarea placeholder="Sentence" name="sentence" className="w-full" defaultValue={params.get('sentence') || ''} />
      <Button className="ml-auto px-4 py-2" type="submit">
        Add
      </Button>
    </form>
  );
}
