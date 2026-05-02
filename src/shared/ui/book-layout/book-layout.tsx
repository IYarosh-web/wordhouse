import { forwardRef, useRef } from "react";

import { useBookLayout } from "./useBookLayout";

import bookImage from './book.png'

import styles from './book-layout.module.css';

export function _BookLayout({children}: {children: React.ReactNode}, ref: React.RefObject<HTMLDivElement>) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { next, prev, COLUMN_WIDTH, COLUMN_GAP, COLUMN_RULE_WIDTH, PADDING, WIDTH } = useBookLayout(containerRef);
    
    return (
        <div
            ref={ref}
            tabIndex={0}
            className={styles.wrapper + " relative"}
            style={{width: WIDTH, padding: PADDING, backgroundImage: `url(${bookImage})`}}
        >
            <div
                ref={containerRef}
                style={{columnWidth: COLUMN_WIDTH, columnGap: COLUMN_GAP, columnRuleWidth: COLUMN_RULE_WIDTH}}
                className={styles.scrollContainer}
            >
                {children}
            </div>
            <div className="h-8 flex justify-between">
                <button onClick={prev}>←Prev</button>
                <button onClick={next}>Next→</button>
            </div>
        </div>
    )
}

const BookLayout = forwardRef(_BookLayout);

export { BookLayout };