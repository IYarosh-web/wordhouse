import { Link } from "react-router";

export function SettingsPage() {
    return (
        <>
            <div className="sidebar">
                <h1>Settings</h1>
            </div>
            <div className="navbar">
                <Link to="/dashboard">Back to dashboard</Link>
            </div>
            <div className="left">
                <h1>Settings</h1>
            </div>
        </>
    )
}