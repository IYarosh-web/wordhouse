import { Dialog, DialogPanel, DialogTitle } from "shared/ui";
import { AddWordForm } from "./form";
import { redirectTo } from "shared/contracts";
import { motion } from "framer-motion";

export function AddWordModal() {
    const handleClose = () => {
        redirectTo('/dashboard');
    }

    return (
        <Dialog className="relative z-50" open onClose={handleClose}>
            <div className="fixed inset-0 z-10 w-screen">
                <div className="flex min-h-full items-center justify-center p-4">
                    <motion.div layoutId="add-word">
                        <DialogPanel className="w-full max-w-md border-2 p-6 bg-white">
                            <DialogTitle as="h2" className="text-xl font-bold">Add word</DialogTitle>
                            <AddWordForm />
                        </DialogPanel>
                    </motion.div>
                </div>
            </div>
        </Dialog>
    )
}