import { cloneElement, isValidElement, useEffect, useRef } from "react";

type Props = {
  keyCode: string;
};

function FocusOnCtrlKey({ children, keyCode }: React.PropsWithChildren<Props>) {
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("focusing");
      console.log(event.ctrlKey, event.key, keyCode);
      if (event.ctrlKey && event.key === keyCode) {
        event.preventDefault();
        childRef.current?.focus();
        console.log("focused", childRef.current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isValidElement(children)) {
    console.log("cloning", children);
    const el = cloneElement(children, {ref: childRef});
    return el;
  }

  return children;
}

export { FocusOnCtrlKey };
