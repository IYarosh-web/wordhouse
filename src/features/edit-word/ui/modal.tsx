import { Dialog, DialogPanel } from "shared/ui";
import { EditWordForm } from "./form";
import { redirectTo } from "shared/contracts";

export function EditWordModal() {
    const handleClose = () => {
        redirectTo('/dashboard');
    }

    return (
        <Dialog open onClose={handleClose}>
            <DialogPanel>
                <EditWordForm />
            </DialogPanel>
        </Dialog>
    )
}