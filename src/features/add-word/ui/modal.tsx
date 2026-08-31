import { Button, Dialog, DialogPanel, DialogTitle, Icons } from "shared/ui";
import { AddWordForm } from "./form";
import { closeModal } from "shared/contracts";
import { motion } from "framer-motion";

export function AddWordModal() {
  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog className="relative z-50" open onClose={handleClose}>
      <div className="fixed inset-0 z-10 w-screen">
        <div className="flex min-h-full items-center justify-center">
          <motion.div layoutId="add-word">
            <DialogPanel className="w-md border-2 bg-white">
              <DialogTitle
                as="h2"
                className="flex justify-between items-center text-xl font-bold px-6 py-2 bg-amber-200"
              >
                Add word
                <Button className="p-2" onClick={handleClose}>
                  <Icons.Xmark />
                </Button>
              </DialogTitle>
              <AddWordForm />
            </DialogPanel>
          </motion.div>
        </div>
      </div>
    </Dialog>
  );
}
