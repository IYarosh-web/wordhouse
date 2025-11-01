import { forwardRef } from "react";
import { Button as HeadlessButton, ButtonProps } from "@headlessui/react";

const Button = forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
    ({ children, className, ...props }, ref) => {
        return (
            <HeadlessButton 
                ref={ref}
                className={'cursor-pointer focus:outline-2 outline-offset-2 ' + className} 
                {...props}
            >
                {children}
            </HeadlessButton>
        );
    }
);

Button.displayName = "Button";

export {Button};