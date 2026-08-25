import { Fragment, useSyncExternalStore } from "react";

import {
  formatShortcutKey,
  type ShortcutKey,
} from "shared/lib/keyboard-shortcut";
import { isMacPlatform } from "shared/lib/platform";

type KbdProps = React.ComponentPropsWithoutRef<"kbd">;

function Kbd({ className = "", children, ...props }: KbdProps) {
  return (
    <kbd
      className={`inline-flex min-h-6 min-w-6 items-center justify-center px-1.5 py-0.5 text-xs leading-none br br-s border-2 bg-[#FF9E20] ${className}`}
      {...props}
    >
      {children}
    </kbd>
  );
}

type KeyboardShortcutProps = {
  keys: ShortcutKey[];
  separator?: React.ReactNode;
  className?: string;
};

function KeyboardShortcut({
  keys,
  separator = "+",
  className = "",
}: KeyboardShortcutProps) {
  const isMac = isMacPlatform();

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {keys.map((key, index) => (
        <Fragment key={`${key}-${index}`}>
          {index > 0 && (
            <span className="text-xs opacity-70" aria-hidden="true">
              {separator}
            </span>
          )}
          <Kbd>{formatShortcutKey(key, isMac)}</Kbd>
        </Fragment>
      ))}
    </span>
  );
}

type KeyboardShortcutHintProps = KeyboardShortcutProps & {
  children?: React.ReactNode;
  hint?: string;
};

function KeyboardShortcutHint({
  keys,
  separator,
  className = "",
  children,
  hint,
}: KeyboardShortcutHintProps) {
  const isMac = isMacPlatform();
  const labels = keys.map((key) => formatShortcutKey(key, isMac));
  const accessibleLabel =
    hint ?? `Press ${labels.join(` ${typeof separator === "string" ? separator : " + "} `)}`;

  return (
    <span className={`inline-flex items-center gap-1 text-xs ${className}`}>
      <span aria-hidden="true">
        <KeyboardShortcut keys={keys} separator={separator} />
      </span>
      {children && <span>{children}</span>}
      <span className="sr-only">{accessibleLabel}</span>
    </span>
  );
}

export { Kbd, KeyboardShortcut, KeyboardShortcutHint };
