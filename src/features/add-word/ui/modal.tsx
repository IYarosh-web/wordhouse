import { useUnit } from "effector-react";
import { addWordFormSubmittedFx } from "features/add-word";

function AddWordModal() {
  const [handleWordFormSubmitted] = useUnit([addWordFormSubmittedFx]);

  return (
    <form onSubmit={handleWordFormSubmitted}>
      <h3 className="text-2xl font-bold text-center">Add Word</h3>
      <input type="text" placeholder="Word" name="word" className="w-full border-1" />
      <input type="text" placeholder="Definition" name="definition" className="w-full border-1" />
      <button type="submit" className="border-1">Add</button>
    </form>
  );
}

export { AddWordModal };
