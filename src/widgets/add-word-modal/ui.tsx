import { useUnit } from "effector-react";
import { Button, FocusOnCtrlKey, Input } from "shared/ui";
import { addWordFormSubmittedFx } from "features/add-word";
import { NotebookLayout } from "widgets/notebook-layout/ui";

function AddWordModal() {
  const [handleWordFormSubmitted] = useUnit([addWordFormSubmittedFx]);

  return (
    <NotebookLayout
      left={
        <div className="grid grid-cols-8 gap-2 items-center">
          <h2 className="font-bold col-span-8 text-lg text-center">
            Add new word
          </h2>
          <form
            action="#"
            onSubmit={handleWordFormSubmitted}
            className="contents"
          >
            <FocusOnCtrlKey keyCode="ArrowRight">
              <Input
                className="col-span-8"
                type="text"
                required
                name="word"
                placeholder="Word"
              />
            </FocusOnCtrlKey>
            <Input
              className="col-span-8"
              type="text"
              required
              name="definition"
              placeholder="Definition"
            />
            <div className="col-span-2" />
            <Button className="col-span-4" type="submit">
              Add word
            </Button>
          </form>
        </div>
      }
      right={<div />}
    />
  );
}

export { AddWordModal };
