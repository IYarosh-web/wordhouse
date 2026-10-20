import { useEffect, useMemo, useRef, useState } from "react";
import { isCommandKeyEvent, ShortcutKey } from "shared/lib/keyboard-shortcut";
import { KeyboardShortcut } from "./keyboard-shortcut";

type Props = {
  keyCode: ShortcutKey;
  disabled?: boolean;
  shortcutPosition?: 'left-top' | 'left-middle' | 'left-bottom' | 'middle-top' | 'center' | 'middle-bottom' | 'right-top' | 'right-middle' | 'right-bottom'; 
  dx?: number;
  dy?: number;
};

function FocusOnCtrlKey({
  children,
  keyCode,
  disabled = false,
  shortcutPosition = 'left-top',
  dx = 0,
  dy = 0,
}: React.PropsWithChildren<Props>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [commandKeyPressed, setCommandKeyPressed] = useState(false);

  const position = useMemo(() => {
    switch (shortcutPosition) {
      case 'right-top':
        return {
          top: 0,
          left: '100%',
        };
      case 'right-middle':
        return {
          top: '50%',
          left: '100%',
        }
      case 'right-bottom':
        return {
          top: '100%',
          left: '100%',
        }
      case 'middle-top':
        return {
          top: 0,
          left: '50%',
        }
      case 'center':
        return {
          top: '50%',
          left: '50%',
        }
      case 'middle-bottom':
        return {
          top: '100%',
          left: '50%'
        }
      case 'left-top':
        return {
          left: 0,
          top: 0,
        }
      case 'left-middle':
        return {
          left: '100%',
          top: '50%',
        }
      case 'left-bottom':
        return {
          left: '100%',
          top: '100%',
        }
    }
  }, [commandKeyPressed]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
    <div className="flex relative isolate" ref={wrapperRef}>
      {children}
      {commandKeyPressed && (
        <div className="absolute z-10" style={{left: `calc(${position.left} + ${dx}px`, top: `calc(${position.top} + ${dy}px)`, transform: `translate(-50%, -50%)`}}>
          <KeyboardShortcut keys={[keyCode]} />
        </div>
      )}
    </div>
  );
}

export { FocusOnCtrlKey };
