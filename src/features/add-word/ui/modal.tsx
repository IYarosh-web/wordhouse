import { useUnit } from "effector-react";
import { Button, Dialog, DialogPanel, DialogTitle, FocusOnCtrlKey, Icon, Input } from "shared/ui";
import { addWordFormSubmittedFx } from "features/add-word";
import { AnimatePresence, motion } from "motion/react";
import { $isOpen, closeModal } from "../model";

function AddWordModal() {
  const [isOpen, handleWordFormSubmitted, close] = useUnit([$isOpen, addWordFormSubmittedFx, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && <Dialog open onClose={close} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel>
            <AnimatePresence propagate>
              <motion.div
                initial={{top: "-50vh", opacity: 0, rotate: -5}}
                animate={{top: 0, opacity: 1, rotate: 0}}
                exit={{top: "100vh", opacity: 0, rotate: 5}}
                transition={{
                  type: "spring",
                  duration: 0.5,
                }}
                className="relative border-4 p-8 w-[500px] rounded-4xl bg-white"
              >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <DialogTitle as="h2" className="flex-1 font-bold pt-2 col-span-8 heading-2 text-2xl text-center">
                        Add new word
                      </DialogTitle>
                      <Button autoFocus variant="blank" onClick={close}>
                        <Icon name="close" />
                      </Button>
                    </div>
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
              </AnimatePresence>
            </DialogPanel>
          </div>
        </Dialog>}
      </AnimatePresence>
  );
}

export { AddWordModal };
