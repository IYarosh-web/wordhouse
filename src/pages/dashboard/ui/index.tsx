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
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div>
                <div className={styles.header}>
                    <Navbar />
                </div>
                <div className={styles.main}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export { DashboardPage };