import { createEvent, sample } from "effector";
import { deleteWordFx } from "entities/word/model/store";

export const deleteWordFormSubmitted =
  createEvent<React.FormEvent<HTMLFormElement>>();

sample({
  clock: deleteWordFormSubmitted,
  fn: (event) => {
    event.preventDefault();
    console.log({event});

    const formData = new FormData(event.currentTarget);
    return formData.get("wordId") as string;
  },
  target: deleteWordFx,
});
