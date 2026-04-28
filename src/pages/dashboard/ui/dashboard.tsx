import { Outlet, useLocation } from "react-router";
import { locationChanged } from "app/model";
import { useEffect } from "react";
import { useUnit } from "effector-react";

function DashboardPage() {
  const location = useLocation();

  const [changeLocation] = useUnit([locationChanged]);

  useEffect(() => {
    changeLocation(location.pathname);
  }, [location, changeLocation]);

  return (
    <div className="h-full w-full">
      <Outlet />
    </div>
  );
}

export { DashboardPage };
