import { createEvent, sample } from "effector";
import { deleteWord } from "entities/word";

export const deleteWordFormSubmitted =
  createEvent<React.FormEvent<HTMLFormElement>>();

sample({
  clock: deleteWordFormSubmitted,
  fn: (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    return formData.get("wordId") as string;
  },
  target: deleteWord,
});
