import { Link, Outlet } from "react-router";

import styles from './styles.module.css';

function WidgetsPage() {
    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.content}>
                <div>
                    <h1>Widgets</h1>
                </div>
                <div>
                    <Link to="/dashboard/add-word">Back to dashboard</Link>
                    <div className={styles.list}>
                        <div className="h-40 border-2 flex items-center justify-center">
                            <Link to="/widget/wordle">Wordle</Link>
                        </div>
                        <div className="h-40 border-2 flex items-center justify-center">
                            <Link to="/widget/wordle">Wordle</Link>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export { WidgetsPage };