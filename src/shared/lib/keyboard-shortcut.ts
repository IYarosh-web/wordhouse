import { isMacPlatform } from "./platform";

export type ShortcutModifier = "mod" | "ctrl" | "alt" | "shift" | "meta";
export type ShortcutSpecialKey =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "Enter"
  | "Escape"
  | "Space"
  | "Tab"
  | "Backspace"
  | "Delete";

export type ShortcutKey = ShortcutModifier | ShortcutSpecialKey | (string & {});

const MAC_LABELS: Record<string, string> = {
  mod: "⌘",
  ctrl: "⌃",
  control: "⌃",
  alt: "⌥",
  option: "⌥",
  shift: "⇧",
  meta: "⌘",
  cmd: "⌘",
  command: "⌘",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  Enter: "↩",
  Escape: "Esc",
  Space: "Space",
  Tab: "⇥",
  Backspace: "⌫",
  Delete: "Del",
};

const WIN_LABELS: Record<string, string> = {
  mod: "Ctrl",
  ctrl: "Ctrl",
  control: "Ctrl",
  alt: "Alt",
  option: "Alt",
  shift: "Shift",
  meta: "Win",
  cmd: "Ctrl",
  command: "Ctrl",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  Enter: "Enter",
  Escape: "Esc",
  Space: "Space",
  Tab: "Tab",
  Backspace: "Backspace",
  Delete: "Del",
};

export function formatShortcutKey(key: ShortcutKey, isMac = isMacPlatform()) {
  const labels = isMac ? MAC_LABELS : WIN_LABELS;
  const normalized = key.trim();
  const mapped = labels[normalized] ?? labels[normalized.toLowerCase()];

  if (mapped) {
    return mapped;
  }

  if (normalized.length === 1) {
    return normalized.toUpperCase();
  }

  return normalized;
}

export function formatShortcutKeys(
  keys: ShortcutKey[],
  isMac = isMacPlatform(),
) {
  return keys.map((key) => formatShortcutKey(key, isMac));
}
