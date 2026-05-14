import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import { locationChanged } from "shared/contracts";

export function Dashboard() {
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
