import { forwardRef } from "react";
import { Button as HeadlessButton, ButtonProps } from "@headlessui/react";

import styles from "./button.module.css";

type CustomButtonProps = {
  size?: "small" | "medium" | "large";
  variant?: "default" | "blank";
};

const Button = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps & CustomButtonProps>
>(({ children, className, variant = "default", size = "medium", ...props }, ref) => {
  const sizeClasses = (() => {
    switch (size) {
      case 'small':
        return "px-1";
      case "large":
        return "px-4 py-2";
      default:
        return "px-2 py-1";
      
    }
  })();

  const variantClasses = (() => {
    switch (variant) {
      case "blank":
        return "";
      default:
        return "bg-orange-300 border-gray-800";
    }
  })();

  return (
    <HeadlessButton
      ref={ref}
      className={
        `cursor-pointer focus:outline-2 outline-offset-2 ${sizeClasses} border-2 ${variantClasses} rounded-sm border-gray-800 flex items-center justify-center ` +
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
