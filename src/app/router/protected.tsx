import { userApi } from "entities/user/api";
import { Navigate, Outlet } from "react-router";

export function Protected({ children }: { children?: React.ReactNode }) {
  const user = userApi.getUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
}
