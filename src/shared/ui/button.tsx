import { Button as HeadlessButton } from "@headlessui/react";

import styles from './button.module.css';
import { forwardRef } from "react";

const _Button = ({
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>, ref: React.Ref<HTMLButtonElement>) => {
    return <HeadlessButton ref={ref} className={`bg-[#c9593c] py-1 px-2 ${styles.button} ${className}`} {...props} />;
}

const Button = forwardRef(_Button);

export { Button };