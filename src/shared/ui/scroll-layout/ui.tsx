import styles from './styles.module.css';
import { forwardRef } from 'react';

function _ScrollLayout({
    children,
    open = true
}: {
    children: React.ReactNode,
    open?: boolean
}, ref: React.RefObject<HTMLDivElement>) {
    return (
        <div ref={ref} tabIndex={0} className={`relative w-[300px] py-8 outline-offset-4  ${open ? styles.open : styles.close} ${styles.scroll}`}>
            <div className={`${styles.content} overflow-y-auto`}>
                {open && children}
            </div>
        </div>
    )
}

const ScrollLayout = forwardRef(_ScrollLayout);

export { ScrollLayout };