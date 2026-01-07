import { forwardRef } from "react";
import { Button as HeadlessButton, ButtonProps } from "@headlessui/react";

import styles from "./button.module.css";

type CustomButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
};

const Button = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(({ children, className, ...props }, ref) => {
  return (
    <HeadlessButton
      ref={ref}
      className={
        "cursor-pointer focus:outline-2 outline-offset-2 px-2 py-1 border-2 bg-orange-300 rounded-sm border-gray-800 flex items-center justify-center " +
        styles.wrapper +
        " " +
        className
      }
      {...props}
    >
      {children}
    </HeadlessButton>
  );
});

Button.displayName = "Button";

export { Button };
