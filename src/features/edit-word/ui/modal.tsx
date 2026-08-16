import { Modal } from "shared/ui";
import { EditWordForm } from "./form";
import { redirectTo } from "shared/contracts";

export function EditWordModal() {
    const handleClose = () => {
        redirectTo('/dashboard');
    }

    return (
        <Modal>
            <Modal.Backdrop isOpen onOpenChange={handleClose}>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.Body>
                            <EditWordForm />
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}