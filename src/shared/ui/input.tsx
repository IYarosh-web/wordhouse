import { Input as HeadlessInput, InputProps } from "@headlessui/react";

import styles from "./input.module.css";

type CustomInputProps = {
  size?: "small" | "medium" | "large";
}

function Input({ className, size = "medium", ...props }: Omit<InputProps, "size"> & CustomInputProps) {
  const sizeClasses = (() => {
    switch (size) {
      case 'small':
        return "px-1 br-s";
      case 'large':
        return "p-4 py-1 br-l"
      default:
        return "px-2 py-1 br-m";
    }
  })();
  
  return (
    <HeadlessInput
      className={`border-2 ${sizeClasses} bg-white border-gray-800 ${styles.wrapper} ${className}`}
      {...props}
    />
  );
}

export { Input };
