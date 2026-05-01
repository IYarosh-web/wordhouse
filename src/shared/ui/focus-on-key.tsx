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

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isValidElement(children)) {
    const el = cloneElement(children, {ref: childRef});
    return el;
  }

  return children;
}

export { FocusOnCtrlKey };
