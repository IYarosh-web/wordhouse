import { Sidebar } from "widgets";
import { Outlet, useLocation } from "react-router";
import { locationChanged } from "app/model";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import Navbar from "widgets/navbar/ui";

function DashboardPage() {
    const location = useLocation();

    const [changeLocation] = useUnit([locationChanged]);

    useEffect(() => {
        changeLocation(location.pathname);
    }, [location, changeLocation]);

    return (
        <>
            <div className="sidebar overflow-y-auto h-full p-4">
                <Sidebar />
            </div>
            <div className="navbar">
                <Navbar />
            </div>
            <Outlet />
        </>
    );
}

export { DashboardPage };