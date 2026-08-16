import { cloneElement, isValidElement, useEffect, useRef } from "react";

type Props = {
  keyCode: string;
  disabled?: boolean;
};

function FocusOnCtrlKey({ children, keyCode, disabled = false }: React.PropsWithChildren<Props>) {
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return;

      if (event.ctrlKey && event.key === keyCode) {
        event.preventDefault();
        console.log("focusing", childRef.current);
        childRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [disabled, keyCode]);

  if (isValidElement(children)) {
    const el = cloneElement(children, {ref: childRef});
    return el;
  }

  return children;
}

export { FocusOnCtrlKey };
