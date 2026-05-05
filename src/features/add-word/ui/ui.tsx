import { useUnit } from "effector-react";
import { addWordFormSubmittedFx } from "features/add-word";
import { Input, Button } from "shared/ui";

function AddWordModal() {
  const [handleWordFormSubmitted] = useUnit([addWordFormSubmittedFx]);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleWordFormSubmitted}>
      <h3 className="text-2xl font-bold text-center">Add Word</h3>
      <Input type="text" placeholder="Word" name="word" className="w-full" />
      <Input type="text" placeholder="Definition" name="definition" className="w-full" />
      <Input type="text" placeholder="Translation" name="translation" className="w-full" />
      <Button type="submit">Add</Button>
    </form>
  );
}

export { AddWordModal };
