import { forwardRef } from "react";
import { Button as HeadlessButton, ButtonProps } from "@headlessui/react";

import styles from "./sticker-button.module.css";

type CustomProps = {
  color: "red" | "green" | "blue" | "yellow";
};

const StickerButton = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps & CustomProps>
>(({ children, className = "", color = "yellow", ...props }, ref) => {
  return (
    <HeadlessButton
      ref={ref}
      className={`${styles.wrapper} ${className}`}
      {...props}
    >
      {children}
    </HeadlessButton>
  );
});

StickerButton.displayName = "StickerButton";

export { StickerButton };
