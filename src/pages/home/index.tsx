import { Outlet } from "react-router";

function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <Outlet />
        </div>
    );
}

export default HomePage;