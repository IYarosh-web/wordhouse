import { useEffect, useRef } from "react";
import { Link } from "react-router";

export function Redirect({ to }: { to: string }) {
    const ref = useRef<HTMLAnchorElement>(null);
    console.log('redirect element', to);
    useEffect(() => {
        if (ref.current) {
            ref.current.click();
        }

        console.log('self removed');

        ref.current?.remove();
    }, []);

    return (
        <Link ref={ref} to={to} style={{position: 'absolute', top: -100, left: -100}} />
    )
}