import { history } from "app/router/history";
import { useLocation } from "react-router";
import { Tabs } from "shared/ui";

const options = [
      {value: 'dashboard', label: <a>Dashboard</a>},
      {value: 'widgets', label: <a>Widgets</a>},
      {value: 'settings', label: <a>Settings</a>}
    ]

export function Navbar() {
  const location = useLocation();
  
  const selected = options.find(o => location.pathname.includes(o.value));

  const navigateTo = (option) => {
    history.push('/' + option.value);
  }

  return (
    <Tabs options={options} value={selected?.value} onChange={navigateTo} />
  )
}