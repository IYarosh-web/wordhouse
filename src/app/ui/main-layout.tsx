import { Outlet, useLocation } from "react-router";
import styles from "./main-layout.module.css";
import { BookLayout } from "shared/ui/book-layout";
import { ScrollLayout } from "shared/ui/scroll-layout";
import { PAGES_WITH_SCROLL_LAYOUT } from "./model";
import { WordList } from "features/word-list";
import { Navbar } from "features/navbar";
import { FocusOnCtrlKey } from "shared/ui/focus-on-key";

export function MainLayout() {
  const location = useLocation();
  const isScrollLayout = PAGES_WITH_SCROLL_LAYOUT.some(page => location.pathname.startsWith(page));

  return (
    <div className={`${styles.wrapper} flex font-sour-gummy`}>
      <div className="flex flex-row-reverse gap-2 m-auto w-min">
        <div className="flex flex-col gap-2 bg-white">
          <FocusOnCtrlKey keyCode="ArrowUp">
            <Navbar />
          </FocusOnCtrlKey>
          <FocusOnCtrlKey keyCode="ArrowRight">
            <BookLayout>
              <Outlet />
            </BookLayout>
          </FocusOnCtrlKey>
        </div>
        <div className={`${styles.scroll} ${isScrollLayout ? styles.open : styles.close}`}>
          <FocusOnCtrlKey keyCode="ArrowLeft">
            <ScrollLayout open={isScrollLayout}>
                <WordList />
            </ScrollLayout>
          </FocusOnCtrlKey>
        </div>
      </div>
    </div>
  );
}
