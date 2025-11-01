import { Link, Outlet } from "react-router";

function WidgetsPage() {
    return (
        <div>
            <h1>Widgets</h1>
            <Link to="/dashboard/add-word">Back to dashboard</Link>
            <Link to="/widgets/wordle">Wordle</Link>
            <Outlet />
        </div>
    )
}

export { WidgetsPage };