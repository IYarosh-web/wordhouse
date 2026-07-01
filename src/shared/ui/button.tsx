import { ButtonProps, Button as HeadlessButton } from "@headlessui/react";

import styles from './button.module.css';
import { forwardRef } from "react";

type CustomProps = {
    square?: boolean;
}

const _Button = ({
    className,
    square = false,
    ...props
}: ButtonProps<"button" | "div"> & CustomProps, ref: React.Ref<HTMLButtonElement>) => {
    const padding = square ? 'p-1' : 'py-1 px-2';

    return <HeadlessButton ref={ref} className={`bg-[#c9593c] flex ${padding} ${styles.button} ${className}`} {...props} />;
}

const Button = forwardRef(_Button);

export { Button };