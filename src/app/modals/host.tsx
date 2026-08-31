import { useUnit } from "effector-react";

import { AddWordModal } from "features/add-word";
import { EditWordModal } from "features/edit-word";
import { $modal, MODALS } from "shared/routing";

const MODAL_COMPONENTS = {
  [MODALS.addWord]: AddWordModal,
  [MODALS.editWord]: EditWordModal,
} as const;

export function GlobalModalHost() {
  const name = useUnit($modal);
  const Modal = name
    ? MODAL_COMPONENTS[name as keyof typeof MODAL_COMPONENTS]
    : null;

  if (!Modal) {
    return null;
  }

  return <Modal />;
}
