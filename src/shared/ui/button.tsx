import { forwardRef } from "react";
import { Button as HeadlessButton, ButtonProps } from "@headlessui/react";

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
        return "px-1 br-s";
      case "large":
        return "px-4 py-2 br-l";
      default:
        return "px-2 py-1 br-m";
      
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
        `cursor-pointer outline-offset-8 ${sizeClasses} border-2 ${variantClasses} border-gray-800 flex items-center shadow justify-center ` +
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
