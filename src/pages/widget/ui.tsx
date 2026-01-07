import { Link, Outlet } from "react-router";

export function WidgetPage() {
  return (
    <>
      <div className="sidebar"></div>
      <div className="navbar">
        <Link to="/widgets">Widgets</Link>
      </div>
      <Outlet />
    </>
  );
}
