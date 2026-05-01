import { useCallback, useEffect } from "react";

export function useBookLayout(containerRef: React.RefObject<HTMLDivElement>) {
    const COLUMN_WIDTH = 340;
    const COLUMN_GAP = 16;
    const COLUMN_RULE_WIDTH = 2;    
    const PADDING = 16;
    const WIDTH = COLUMN_WIDTH * 2 + COLUMN_GAP + 34; // Magic numbers, don't understand why but needed
    const SCROLL_AMOUNT = WIDTH - 17; // Magic numbers, don't understand why but needed

    const next = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: SCROLL_AMOUNT,
                behavior: "instant"
            });
        }
    }, []);

    const prev = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: -SCROLL_AMOUNT,
                behavior: "instant"
            });
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') {
                next();
            } else if (event.key === 'ArrowLeft') {
                prev();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [next, prev]);   

    return { next, prev, COLUMN_WIDTH, COLUMN_GAP, COLUMN_RULE_WIDTH, PADDING, WIDTH, SCROLL_AMOUNT };
}