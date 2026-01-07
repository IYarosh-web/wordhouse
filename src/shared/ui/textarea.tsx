import { Textarea as HeadlessTextarea, TextareaProps } from "@headlessui/react";

import styles from "./textarea.module.css";

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <HeadlessTextarea
      className={`bg-white px-1 box-border border-2 border-gray-800 rounded-sm ${styles.wrapper} ${className}`}
      {...props}
    />
  );
}

export { Textarea };
