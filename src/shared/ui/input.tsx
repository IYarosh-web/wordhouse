import { Input as HeadlessInput, InputProps } from "@headlessui/react";

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
      className={`border-2 ${sizeClasses} bg-white shadow outline-offset-8 border-gray-800 ${className}`}
      {...props}
    />
  );
}

export { Input };
