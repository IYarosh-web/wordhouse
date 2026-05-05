import { Button as HeadlessButton } from "@headlessui/react";

import styles from './button.module.css';

function Button({
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <HeadlessButton className={`bg-[#c9593c] py-1 px-2 ${styles.button} ${className}`} {...props} />;
}

export { Button };