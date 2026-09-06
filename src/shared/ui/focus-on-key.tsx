import { cloneElement, isValidElement, useEffect, useRef } from "react";

type Props = {
  keyCode: string;
  disabled?: boolean;
};

function FocusOnCtrlKey({
  children,
  keyCode,
  disabled = false,
}: React.PropsWithChildren<Props>) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return;

      if (event.ctrlKey && event.key === keyCode) {
        event.preventDefault();
        if (wrapperRef.current?.firstChild instanceof HTMLElement) {
          wrapperRef.current.firstChild.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [disabled, keyCode]);

  return (
    <div className="contents" ref={wrapperRef}>
      {children}
    </div>
  );
}

export { FocusOnCtrlKey };
