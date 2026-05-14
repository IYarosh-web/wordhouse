import { useUnit } from "effector-react";
import { Link } from "react-router";
import { $isOpen, locationChanged, $redirectLocation } from "./model";
import { useEffect, useRef } from "react";

export function Redirect() {
    const ref = useRef<HTMLAnchorElement>(null);
    const [to, isOpen, done] = useUnit([$redirectLocation, $isOpen, locationChanged]);

    useEffect(() => {
        if (ref.current) {
            ref.current.click();
            done();
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <Link ref={ref} to={to} />
    );
}