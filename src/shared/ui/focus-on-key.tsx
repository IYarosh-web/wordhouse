import { useEffect, useRef, useState } from "react";
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
  const [commandKeyPressed, setCommandKeyPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('huh?', event);
      if (disabled) return;

      if (isCommandKeyEvent(event)) {
        setCommandKeyPressed(true);
      }

      if (commandKeyPressed && event.key === keyCode) {
        event.preventDefault();
        if (wrapperRef.current?.firstChild instanceof HTMLElement) {
          wrapperRef.current.firstChild.focus();
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      console.log('huh?', event);
      if (isCommandKeyEvent(event)) {
        setCommandKeyPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keyup", handleKeyUp, true);
    }
  }, [disabled, keyCode, commandKeyPressed]);

  return (
    <div className="contents" ref={wrapperRef}>
      {children}
    </div>
  );
}

export { FocusOnCtrlKey };
