import { forwardRef } from "react";
import { Button as HeadlessButton, ButtonProps } from "@headlessui/react";

const InlineButton = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(({ children, className, ...props }, ref) => {
  return (
    <HeadlessButton
      ref={ref}
      className={
        "cursor-pointer focus:outline-2 outline-offset-2 inline px-2 mx-1 " +
        className
      }
      {...props}
    >
      {children}
    </HeadlessButton>
  );
});

InlineButton.displayName = "InlineButton";

export { InlineButton };
