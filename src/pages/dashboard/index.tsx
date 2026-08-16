import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import { locationChanged } from "shared/contracts";
import { WordList } from "features/word-list";

export function Dashboard() {
  const location = useLocation();

  const [changeLocation] = useUnit([locationChanged]);

  useEffect(() => {
    changeLocation(location.pathname);
  }, [location, changeLocation]);

  return (
    <div className="h-full w-full">
      <WordList />
      <Outlet />
    </div>
  );
}
