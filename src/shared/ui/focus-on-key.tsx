import { cloneElement, isValidElement, useEffect, useRef } from "react";

type Props = {
  keyCode: string;
};

function FocusOnCtrlKey({ children, keyCode }: React.PropsWithChildren<Props>) {
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === keyCode) {
        event.preventDefault();
        childRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, []);

  if (isValidElement(children)) {
    const el = cloneElement(children, {ref: childRef});
    return el;
  }

  return children;
}

export { FocusOnCtrlKey };
