import { Dialog, DialogPanel } from "shared/ui";
import { AddWordForm } from "./form";
import { redirectTo } from "shared/contracts";
import { Typography } from "@heroui/react";

export function AddWordModal() {
    const handleClose = () => {
        redirectTo('/dashboard');
    }

    return (
        <Dialog open onClose={handleClose}>
            <DialogPanel>
                <AddWordForm />
            </DialogPanel>
        </Dialog>
    )
}