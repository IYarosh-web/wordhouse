import { forwardRef, useRef } from "react";

import { useBookLayout } from "./useBookLayout";

import bookImage from './book.png'

import styles from './book-layout.module.css';

export function _BookLayout({children}: {children: React.ReactNode}, ref: React.RefObject<HTMLDivElement>) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { next, prev, COLUMN_WIDTH, COLUMN_GAP, COLUMN_RULE_WIDTH, PADDING, WIDTH, prevAvailable, nextAvailable, SCROLL_CONTAINER_PADDING } = useBookLayout(containerRef);

    return (
        <div
            ref={ref}
            tabIndex={0}
            className={styles.wrapper + " relative outline-offset-4"}
            style={{width: WIDTH, padding: PADDING, backgroundImage: `url(${bookImage})`}}
        >
            <div
                ref={containerRef}
                style={{columnWidth: COLUMN_WIDTH, columnGap: COLUMN_GAP, columnRuleWidth: COLUMN_RULE_WIDTH, padding: SCROLL_CONTAINER_PADDING }}
                className={styles.scrollContainer}
            >
                {children}
            </div>
            <div className="h-8 flex justify-between">
                <button className={styles.button} onClick={prev} disabled={!prevAvailable}>←Prev</button>
                <button className={styles.button} onClick={next} disabled={!nextAvailable}>Next→</button>
            </div>
        </div>
    )
}

const BookLayout = forwardRef(_BookLayout);

export { BookLayout };