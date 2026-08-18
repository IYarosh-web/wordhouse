import { Navbar } from "features/navbar";
import { FocusOnCtrlKey } from "shared/ui/focus-on-key";
import { Redirect } from "shared/ui/redirect/ui";

import styles from "./main-layout.module.css";

export function MainLayout({children}: React.PropsWithChildren) {

  return (
    <div className={`${styles.wrapper} bg-background-inverse flex flex-col justify-center gap-2`}>
      <FocusOnCtrlKey keyCode="ArrowUp">
        <Navbar />
      </FocusOnCtrlKey>
      <div className={`${styles.box} border-4 bg-background px-2 pt-2 overflow-x-hidden`}>
        <Redirect />

        <FocusOnCtrlKey keyCode="ArrowRight">
          {children}
        </FocusOnCtrlKey>
      </div>
    </div>
  );
}
