import { Sidebar } from "widgets";
import styles from "./styles.module.css";
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
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className="overflow-y-auto h-full p-4">
                    <Sidebar />
                </div>
                <div className="p-4">
                    <div>
                        <Navbar />
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { DashboardPage };