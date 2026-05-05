import { Input as HeadlessInput } from "@headlessui/react";

import styles from './input.module.css';

function Input({
    className,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
    return <HeadlessInput className={`bg-[#d7b494] py-1 px-2 ${styles.input} ${className}`} {...props} />;
}

export { Input };