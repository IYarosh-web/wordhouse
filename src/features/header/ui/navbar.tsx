import { history } from "app/router/history";
import { Link, useLocation } from "react-router";
import { Tabs } from "shared/ui";

const options = [
  {value: 'dashboard', label: <Link to="/dashboard">Dashboard</Link>},
  {value: 'widgets', label: <Link to="/widgets">Widgets</Link>},
  {value: 'settings', label: <Link to="/settings">Settings</Link>}
]

export function Navbar() {
  const location = useLocation();
  
  const selected = options.find(o => location.pathname.includes(o.value));

  return (
    <Tabs options={options} value={selected?.value} />
  )
}