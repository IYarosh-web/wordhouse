import { createEvent, sample } from "effector";
import { wordEntity } from "entities/word";

export const deleteWordFormSubmitted =
  createEvent<React.FormEvent<HTMLFormElement>>();

sample({
  clock: deleteWordFormSubmitted,
  fn: (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    return formData.get("wordId") as string;
  },
  target: wordEntity.deleteWord,
});
