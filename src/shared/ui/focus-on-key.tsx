import { useEffect, useRef } from "react";
import { isCommandKeyEvent } from "shared/lib/keyboard-shortcut";

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
  const commandKeyPressed = useRef(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return;

      if (isCommandKeyEvent(event)) {
        commandKeyPressed.current = true;
      }

      if (commandKeyPressed.current && event.key === keyCode) {
        event.preventDefault();
        if (wrapperRef.current?.firstChild instanceof HTMLElement) {
          wrapperRef.current.firstChild.focus();
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (isCommandKeyEvent(event)) {
        commandKeyPressed.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keyup", handleKeyUp, true);
    }
  }, [disabled, keyCode]);

  return (
    <div className="contents" ref={wrapperRef}>
      {children}
    </div>
  );
}

export { FocusOnCtrlKey };
