import { Navbar } from "features/navbar";
import { FocusOnCtrlKey } from "shared/ui/focus-on-key";
import { Redirect } from "shared/ui/redirect/ui";

import styles from "./main-layout.module.css";

export function MainLayout({children}: React.PropsWithChildren) {

  return (
    <div className={`${styles.wrapper} bg-background-inverse flex font-sour-gummy flex-col gap-2`}>
      <div className={`${styles.widthWrapper} bg-background px-2 pt-2`}>
        <Redirect />
        <FocusOnCtrlKey keyCode="ArrowUp">
          <Navbar />
        </FocusOnCtrlKey>

        <FocusOnCtrlKey keyCode="ArrowRight">
          {children}
        </FocusOnCtrlKey>
      </div>
    </div>
  );
}
