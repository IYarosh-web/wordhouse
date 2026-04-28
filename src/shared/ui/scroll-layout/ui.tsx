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
        <div ref={ref} tabIndex={0} className={`w-[300px] p-4 border-1 overflow-y-auto border-black ${open ? styles.open : styles.close} ${styles.scroll}`}>
            {open && children}
        </div>
    )
}

const ScrollLayout = forwardRef(_ScrollLayout);

export { ScrollLayout };