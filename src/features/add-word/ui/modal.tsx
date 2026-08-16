import { Modal, Button, Icon, Icons } from "shared/ui";
import { AddWordForm } from "./form";
import { redirectTo } from "shared/contracts";
import { Typography } from "@heroui/react";

export function AddWordModal() {
    const handleClose = () => {
        redirectTo('/dashboard');
    }

    return (
        <Modal>
            <Modal.Backdrop isOpen onOpenChange={handleClose}>
                <Modal.Container>
                    <Modal.Dialog>
                        <Modal.Header className="flex">
                            <Typography align="center" type="h5">Add word</Typography>
                            <Modal.CloseTrigger>
                                <Icons.Xmark />
                            </Modal.CloseTrigger>
                        </Modal.Header>
                        <Modal.Body>
                            <AddWordForm />
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    )
}