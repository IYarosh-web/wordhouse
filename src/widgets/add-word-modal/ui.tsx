import { useUnit } from "effector-react";
import { Button, Dialog, DialogPanel, DialogTitle, FocusOnCtrlKey, Input } from "shared/ui";
import { addWordFormSubmittedFx } from "features/add-word";
import { motion } from "motion/react";
import { closeAddWordModal } from "features/desk/model";

function AddWordModal() {
  const [handleWordFormSubmitted, close] = useUnit([addWordFormSubmittedFx, closeAddWordModal]);

  return (
    <Dialog open onClose={close} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel>
          <motion.div layout layoutId={"add-word"} className={`border-4 p-8 rounded-4xl bg-white`}>
              <div className="grid grid-cols-8 gap-2 items-center">
                <DialogTitle as="h2" className="font-bold pt-2 col-span-8 heading-2 text-2xl text-center">
                  Add new word
                </DialogTitle>
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
            </motion.div>
          </DialogPanel>
        </div>
      </Dialog>
  );
}

export { AddWordModal };
