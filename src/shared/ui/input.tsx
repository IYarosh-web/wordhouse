import { Input as HeadlessInput, InputProps } from "@headlessui/react";

function Input({ ...props }: InputProps) {
    return <HeadlessInput {...props} />;
}

export { Input };