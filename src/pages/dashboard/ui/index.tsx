import { Sidebar } from "widgets";
import { Outlet, useLocation } from "react-router";
import { locationChanged } from "app/model";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import Navbar from "widgets/navbar/ui";
import { Desk } from "features/desk";
import { $wordStore } from "entities/word";

function DashboardPage() {
  const location = useLocation();

  const [changeLocation, words] = useUnit([locationChanged, $wordStore]);

  useEffect(() => {
    changeLocation(location.pathname);
  }, [location, changeLocation]);

  return (
    <>
      <Desk words={words} />
      <Outlet />
    </>
  );
}

export { DashboardPage };
