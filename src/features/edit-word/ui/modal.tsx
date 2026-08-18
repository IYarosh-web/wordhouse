import { motion } from "framer-motion";

import { Dialog, DialogPanel, DialogTitle } from "shared/ui";
import { EditWordForm } from "./form";
import { redirectTo } from "shared/contracts";
import { useLocation } from "react-router";

export function EditWordModal() {
    const location = useLocation();
    const word = location.pathname.split('/').pop();
    const handleClose = () => {
        redirectTo('/dashboard');
    }

    return (
        <Dialog className="relative z-50" open onClose={handleClose}>
        <div className="fixed inset-0 z-10 w-screen">
            <div className="flex min-h-full items-center justify-center p-4">
                <motion.div layoutId={word}>
                    <DialogPanel className="w-full max-w-md border-2 p-6 bg-white">
                        <DialogTitle as="h2" className="text-xl font-bold">{word}</DialogTitle>
                        <EditWordForm />
                    </DialogPanel>
                </motion.div>
            </div>
        </div>
    </Dialog>
    )
}