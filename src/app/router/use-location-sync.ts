import { useUnit } from "effector-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { locationChanged } from "shared/contracts";

export function useLocationSync() {
    const location = useLocation();

    const [changeLocation] = useUnit([locationChanged]);

  useEffect(() => {
    changeLocation({ pathname: location.pathname, search: location.search });
  }, [location, changeLocation]);
}