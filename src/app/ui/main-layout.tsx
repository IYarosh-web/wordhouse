import { Navbar } from "features/navbar";
import { FocusOnCtrlKey, KeyboardShortcut } from "shared/ui";
import { Redirect } from "shared/ui/redirect/ui";

import { GlobalModalHost } from "../modals";
import { useLocationSync } from "../router/use-location-sync";

import styles from "./main-layout.module.css";

export function MainLayout({ children }: React.PropsWithChildren) {
  useLocationSync();

  return (
    <div
      className={`${styles.wrapper} bg-background-inverse flex flex-col justify-center gap-2`}
    >
      <div className="flex items-center justify-between gap-2 px-1">
        <FocusOnCtrlKey shortcutPosition="left-top" keyCode="ArrowUp">
          <Navbar />
        </FocusOnCtrlKey>
      </div>
      <div
        className={`${styles.box} relative border-4 bg-background px-2 pt-2 overflow-x-hidden`}
      >
        <Redirect />

        {children}
      </div>
      <GlobalModalHost />
    </div>
  );
}
