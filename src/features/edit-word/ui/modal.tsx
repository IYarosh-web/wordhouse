import { motion } from "framer-motion";

import { Button, Dialog, DialogPanel, DialogTitle, Icons, Input } from "shared/ui";
import { EditWordForm } from "./form";
import { closeModal } from "shared/contracts";
import { useUnit } from "effector-react";
import { $activeWord, $paramsWord } from "../model";
import { deleteWordFormSubmitted } from "features/delete-word";

export function EditWordModal() {

    const [activeWord, deleteWord, word] = useUnit([$activeWord, deleteWordFormSubmitted, $paramsWord]);

    const handleClose = () => {
        closeModal();
    }

    return (
        <Dialog className="relative z-50" open onClose={handleClose}>
            <div className="fixed inset-0 z-10 w-screen">
                <div className="flex min-h-full items-center justify-center">
                    <motion.div layoutId="word">
                        <DialogPanel className="w-xl border-2 bg-white">
                            <DialogTitle as="h2" className="flex justify-between items-center text-xl font-bold px-6 py-2 bg-amber-200">
                                {word}
                                <div className="flex gap-2">
                                    <form onSubmit={deleteWord}>  
                                        <Input type="hidden" name="wordId" value={activeWord?.id} />
                                        <Button className="p-2 bg-transparent" type="submit">
                                            <Icons.TrashBin />
                                        </Button>
                                    </form>
                                    <Button className="p-2" onClick={handleClose}>
                                        <Icons.Xmark />
                                    </Button>
                                </div>
                            </DialogTitle>
                            <EditWordForm />
                        </DialogPanel>
                    </motion.div>
                </div>
            </div>
        </Dialog>
    )
}