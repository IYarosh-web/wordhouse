import { Input as HeadlessInput, InputProps } from "@headlessui/react";

import styles from "./input.module.css";

function Input({ className, ...props }: InputProps) {
  return (
    <HeadlessInput
      className={`border-2 px-2 py-1 bg-white border-gray-800 rounded-sm ${styles.wrapper} ${className}`}
      {...props}
    />
  );
}

export { Input };
