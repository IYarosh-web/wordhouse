import { Link, Outlet } from "react-router";

export function WidgetPage() {
    return (
        <div>
            <Link to="/widgets">Widgets</Link>
            <Outlet />
        </div>
    )
}